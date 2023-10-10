import React, { useEffect, useContext, useCallback} from "react";
import Header from "../Headers";
import Products from "../ProductTypes/Products";
import Context from "../../Context";
import { StudyData } from '../../Context';

import styles from "./index.module.scss";

const StudyApp = () => {
  const { linkSuccess, isItemAccess, isPaymentInitiation, dispatch, studyData: rawStudyData} = useContext(Context);
  const studyData = rawStudyData as StudyData | null;

  const fetchData = async (studyName: string) => {
  try {    
    const url = `/api/get_file_data?id=${studyName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
  };

  const urlSearchParams = new URLSearchParams(window.location.search);
  let studyName = urlSearchParams.get('studyname'); 

  useEffect(() => {
    let searchParams = urlSearchParams.toString();
    if (searchParams && studyName) {
      dispatch({ type: 'SET_SEARCH_PARAMS', searchParams });
      dispatch({ type: 'SET_STUDY_NAME', studyName });
    }
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  const fetchDataAsync = async () => {
  if (studyName && studyData === null) {
    const data = await fetchData(studyName);
    dispatch({ type: "SET_STUDY_DATA", studyData: data });
  }
  };

  useEffect(() => {
    fetchDataAsync();
    }, [studyName]); 

  const getInfo = useCallback(async () => {
    const response = await fetch("/api/info", { method: "POST" });
    if (!response.ok) {
      dispatch({ type: "SET_STATE", state: { backend: false } });
      return { paymentInitiation: false };
    }
    const data = await response.json();
    const paymentInitiation: boolean = data.products.includes(
      "payment_initiation"
    );
    dispatch({
      type: "SET_STATE",
      state: {
        products: data.products,
        isPaymentInitiation: paymentInitiation,
      },
    });
    return { paymentInitiation };
  }, [dispatch]);

  const generateToken = useCallback(
    async (isPaymentInitiation) => {
      // Link tokens for 'payment_initiation' use a different creation flow in your backend.
      const path = isPaymentInitiation
        ? "/api/create_link_token_for_payment"
        : "/api/create_link_token";
      const response = await fetch(path, {
        method: "POST",
      });
      if (!response.ok) {
        dispatch({ type: "SET_STATE", state: { linkToken: null } });
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          dispatch({
            type: "SET_STATE",
            state: {
              linkToken: null,
              linkTokenError: data.error,
            },
          });
          return;
        }
        dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
      }
      // Save the link_token to be used later in the Oauth flow.
      localStorage.setItem("link_token", data.link_token);
    },
    [dispatch]
  );

  useEffect(() => {
    const init = async () => {
      const { paymentInitiation } = await getInfo(); // used to determine which path to take when generating token
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes("?oauth_state_id=")) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkToken: localStorage.getItem("link_token"),
          },
        });
        return;
      }
      generateToken(paymentInitiation);
    };
    init();
  }, [dispatch, generateToken, getInfo]);

  return (
    <div className={styles.App}>
      <div className={styles.container}>

        <Header />

        {linkSuccess && (
          <>
            {isPaymentInitiation && (
              <Products />
            )}
            {isItemAccess && (
              <>
				      <Products />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudyApp;
