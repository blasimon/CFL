import React, { useContext, useState, useEffect } from "react";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import InlineLink from "plaid-threads/InlineLink";
import Link from "../Link";
import Context from "../../Context";
import styles from "./index.module.scss";

const Header = () => {
  const {
    itemId,
    accessToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
    isPaymentInitiation,
    studyData,
  } = useContext(Context);  



  return (
    <div className={styles.grid}>

    <br />
    <Callout warning>
      This application is operational but set to use a <strong>development sandbox</strong> with Plaid. This means that although our codes are operational, Plaid knows not to accept real account logins and password. It will also return fabricated data.<br/ ><br /> 
      <ul>
      <li><strong>Account selection:</strong> No matter the institution you choose, enter <strong>user_good</strong> and <strong>pass_good</strong>. If asked for verifiction code, enter <strong>1234</strong>.</li><br />
      <li><strong>Eligibility verification:</strong> No matter the institution you chose, Plaid will return made-up transactions and account names (it labels those as Plaid bank no matter what). </li>
      </ul>
    </Callout>

      {!linkSuccess ? (
        <> 
        {studyData && (
          <>
            <h3 className={styles.title}>Consumer Finance Link</h3>
            <br /><br />
            <h4 className={styles.subtitle}>{studyData.StudyName}</h4>          
            <p>{studyData.subtitle}</p><br />         
            <h4 className={styles.subtitle}>What do you need to provide to qualify?</h4>          
            {parseInt(studyData.UseVerify, 10) === 1 && (
              <p>{studyData.VerifyDesc}</p>
            )}
            {parseInt(studyData.UseBalance, 10) === 1 && (
              <p>{studyData.BalanceDesc}</p>
            )}
            <br />
            <h4 className={styles.subtitle}>How does it work?</h4>                                 
            <p className={styles.introPar}>{studyData.introPar}</p>
          </>
        )}                                         

          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <Callout warning>
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your
              <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
            </Callout>
          ) : /* message if backend is running and there is no link token */
          linkToken == null && backend ? (
            <Callout warning>
              <div>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured
                correctly.
              </div>              
              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{" "}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </Callout>
          ) : linkToken === "" ? (
            <div className={styles.linkButton}>
              <Button large disabled>
                Loading...
              </Button>
            </div>
          ) : (
            <div className={styles.linkButton}>
              <Link />
            </div>
          )}
        </>
      ) : (
        <>
          {isPaymentInitiation ? (
            <>
            <h4 className={styles.subtitle}>
              Congrats! Your payment is now confirmed.
              <p/>
              <Callout>
                You can see information of all your payments in the{' '}
                <InlineLink
                    href="https://dashboard.plaid.com/activity/payments"
                    target="_blank"
                >
                  Payments Dashboard
                </InlineLink>
                .
              </Callout>
            </h4>
            <p className={styles.requests}>
              Now that the 'payment_id' stored in your server, you can use it to access the payment information:
            </p>
          </>
          ) : /* If not using the payment_initiation product, show the item_id and access_token information */ (
            <>
            {isItemAccess && studyData ? (
              <>
                <h3 className={styles.title}>Consumer Finance Link</h3><br />           
                 <p className={styles.introPar}>{studyData.itemAccessDesc}                 
                 </p>
              </>                 
            ) : (
                <h4 className={styles.subtitle}>
                  <Callout warning>
                    Unable to create an item. Please check your backend server
                  </Callout>
                </h4>
            )}
          </>
          )}
        </>
      )}
    </div>
  );
};

Header.displayName = "Header";

export default Header;
