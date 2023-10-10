import React, { useState, useContext, useEffect } from "react";
import Button from "plaid-threads/Button";

import Table from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";

import styles from "./index.module.scss";
import Qualtrics from "../Qualtrics";

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

const Endpoint = (props: Props) => {  
  const [showTable, setShowTable] = useState(false);
  const [redirect, setRedirect] = useState<boolean | null>(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);  
  const [verificationStatus, setVerificationStatus] = useState<boolean>(false); // <-- This is your new state

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });    
    const data = await response.json();        
    
    // Check for errors
    if (data.error) {
      setError(data.error);
      setIsLoading(false);
      return;
    }

    // Get verification status
    const response2 = await fetch('/api/get_verification_state', { method: 'GET' });
    const data2 = await response2.json();
    setVerificationStatus(data2.isVerified);        

    // Transform the data
    setTransformedData(props.transformData(data)); 

    // If there's a PDF, set it
    if (data.pdf) {
      setPdf(data.pdf);
    }

    setRedirect(true);
    setShowTable(true);
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.endpointContainer}>
        <div className={styles.endpointContents}>
          <div className={styles.endpointHeader}>
            {props.name != null && (
              <span className={styles.endpointName}>{props.name}</span>
            )}
            <span className={styles.schema}>{props.schema}</span>
          </div>
          <div className={styles.endpointDescription}>{props.description}</div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            small
            centered
            wide
            secondary
            className={styles.sendRequest}
            onClick={getData}
          >
            {isLoading ? "Loading..." : `Verify Eligibility`}
          </Button>
          {pdf != null && (
            <Button
              small
              centered
              wide
              className={styles.pdf}
              href={`data:application/pdf;base64,${pdf}`}
              componentProps={{ download: "Asset Report.pdf" }}
            >
              Download PDF
            </Button>
          )}
        </div>
      </div>      
      {redirect && (        
        <Qualtrics          
          data={transformedData}
          verified={verificationStatus}    
          isIdentity={props.endpoint === "verifylasttrans"}          
        />
      )}
      {showTable && (
        <Table
          categories={props.categories}
          data={transformedData}
          isIdentity={props.endpoint === "identity"}
        />
      )}
      {error != null && <Error error={error} />}
    </>
  );
};

Endpoint.displayName = "Endpoint";

export default Endpoint;
