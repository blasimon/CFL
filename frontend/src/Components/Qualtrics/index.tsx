import React, { useContext } from 'react';
import { DataItem } from "../../dataUtilities";
import Context from "../../Context/";
import Button from "plaid-threads/Button";
import styles from "../Endpoint/index.module.scss";

interface Props {
    data: Array<DataItem>;
    verified: boolean;
    isIdentity: boolean;   
  }

const Qualtrics= (props: Props) => {
  const { studyData, searchParams } = useContext(Context);
  const handleButtonClickTrue = () => {
    const tempurl = studyData?.RedirectPass ?? "";
    const url = tempurl + searchParams;
    window.open(url, '_blank'); //to chane 
  };

  const handleButtonClickFalse = () => {
    const tempurl = studyData?.RedirectFail ?? ""; 
    const url = tempurl + searchParams;
    window.open(url, '_blank'); //to chane     // Redirect to the static page
  }; 
  return (props.verified === true)  ? ( //Check ifverified hre
    <div style={{ maxWidth: '75%' }}>
      <strong>Result: Eligible. </strong> <br/><br/> Below are the financial data we accessed, to illustrate the data we used. We do not keep this data.<br/><br/>            
          <Button
            large
            centered
            wide
            secondary            
            onClick={handleButtonClickTrue}                    
            >
              Proceed to study
          </Button><br/><br/>
    </div>
  ):(
  <div style={{ maxWidth: '75%' }}>
          <strong>Result: Ineligible. </strong> <br/><br/> Below are the financial data we accessed, to illustrate the data we used. We do not keep this data.<br/>            
          <Button
            small
            centered
            wide
            secondary            
            onClick={handleButtonClickFalse}            
            >
              Continue
          </Button><br />
  </div>
);
};

export default Qualtrics;
