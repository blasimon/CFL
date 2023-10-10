import React, { useContext, useEffect, useState } from "react";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import InlineLink from "plaid-threads/InlineLink";
import Link from "../Link";
import Context from "../../Context";

import styles from "./index.module.scss";
//import StudyLink from "../StudyLink";

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
  } = useContext(Context);  

const searchParams = new URLSearchParams(window.location.search);
const studyName = searchParams.get('studyname');

  const [studydata, setStudyData] = useState<any>(null);

useEffect(() => {
  const fetchDataAsync = async () => {
    if (studyName) {
      const data = await fetchData(studyName);
      setStudyData(data);
    }
  };

  fetchDataAsync();
}, [studyName]);

  if (!studyName) {
    return <p>The URL you visited does not respond to an existing study. You shouldn't be here.</p>;
  }

  if (!studydata) {
    return <p>Loading...</p>;
  }



  return (
    <div className={styles.grid}>

      <h3 className={styles.title}>Consumer Finance Link</h3>

      {!linkSuccess ? (
        <> 
            {studydata && (
      <div>
        <h3>Study Data:</h3>
        <p>{studydata.introPar}</p>
      </div>
    )}

          <h4 className={styles.subtitle}>
            Welcome to the eligibility study for <b>transactions</b>.
          </h4>
          <p></p>          
          
          <h3 className={styles.subtitle}>1. Context</h3>
          <p className={styles.introPar}>
            This webpage is rendered by our client-side application, which uses Node.js and React. The client-side application directly communicates with potential survey respondents like you.
          </p>
          <p className={styles.introPar}>
          The way to verify that the client-side applications is indeed the CFL is to require the client-side provide something called a <b>link token</b> (a token is a credential that can proves identity to access something). To get that link token from Plaid, one has to verify their identity as CFL using keys that someone who truly is the CFL should possess (they are called PLAID_CLIENT_ID and PLAID_SECRET). We can get them from the Plaid dashboard for developers:
          <img src="/assets/images/Keys.png"></img>
          </p>
          <p className={styles.introPar}>
            One should never store these keys on a client-side application, because they could be too easily be stolen. So, they aren't store on the client. Then, without the keys, how can the client-side application get a link token?  
          </p>
          <p className={styles.introPar}>
          By asking the <i>server-side application</i> to act as a relay. The server-side application is a sort of "middle man." The key is that it can establish secure connections between <i>both</i> the client-side application and Plaid. By having sending two keys that are very safetly protected and not given to the client-side application (PLAID_CLIENT_ID and PLAID_SECRET), it can prove to Plaid that it is indeed the CFL app and Plaid can send the server-side application a link token - a token that the server-side application then relays to the client-side application.
          </p>

          <p className={styles.introPar}>
          Equipped with this <b>link token</b> (which is pretty short lived, to stay safe), the client-side application can now request a link widget and display the "Proceed with study" you see below. Note that clicking this button will Trigger the Plaid Widget link, and that you'll be leaving the CFL while you interact with Plaid and your (fake) financial institution.
          </p>
          <p className={styles.introPar}>
          All the steps I've just described can be visualized in the part boxed in blue.
          <img src="/assets/images/UML_part1.png"></img>
          </p>

          <h3 className={styles.subtitle}>2. We have a link token. Now what?</h3>

          <p className={styles.introPar}>
          The study you're about to test is our <b>Uber transactions</b> study. For this, you have to link an account (credit or debit) that made <i>at least</i> one transaction from Uber in the last 30 transactions.
          </p>

          <p className={styles.introPar}>
          As the app is functional but in sandbox mode, you can't link a real bank account. However, you can use <b>login: user_good</b> and <b>password: pass_good</b> to connect to available bank on Plaid. Note that if it asks for two-factor authentication (e.g., sending you a text), <b>the code is always 1234.</b>
          </p>

          <p className={styles.introPar}>
          Once you press the "proceed with study" button, you'll be launching the Plaid widget. Plaid will establish a private connection with your institution, either by collecting encrypted credentials or by using OAuth.</p>
          <p className={styles.introPar}>CFL client-side application does not get to see anything that you give your institution or Plaid. Even though everything is happening in your browser. </p>
                              

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
                If you are on a Windows machine, please ensure that you have
                cloned the repo with{" "}
                <InlineLink
                  href="https://github.com/plaid/quickstart#special-instructions-for-windows"
                  target="_blank"
                >
                  symlinks turned on.
                </InlineLink>{" "}
                You can also try checking your{" "}
                <InlineLink
                  href="https://dashboard.plaid.com/activity/logs"
                  target="_blank"
                >
                  activity log
                </InlineLink>{" "}
                on your Plaid dashboard.
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
              {/* <br/>
              <br/>
              <StudyLink/> */}
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
            {isItemAccess ? (
                 <p className={styles.introPar}>
                  <h3>Great, you connected an account!</h3><br />
                  <h4>1. What did you miss?</h4><br />
                  A lot has happened since you left the CFL website to connect to your financial institution. See the blue box in the UML below.
                   <img src="../assets/images/UML_part2.png"></img>
                   <p>Depending on the financial institution you selected, you would have seen different screens. Each institution has their own requirements and processes.<br /><br /></p>
                   <p><b>Case 1 (non-OAuth): Citibank.</b> If you selected Citibank, you would have seen a screen that looks like this:<br></br>
                   <img src="../assets/images/Login_citibank.PNG"></img><br />
                   which tells you that Plaid (not CFL) is collecting your credentials to connect to Citibank.</p>
                   <p><br /><b>Case 1 (non-OAuth): Charles Schwab.</b> If you selected Schwab, you would have a screen that informs you that you're leaving Plaid and then some screen at Platypus bank:<br /><br />
                   <table><tr><td><img src="../assets/images/Login_schwab.PNG"></img><br /></td><td><img src="../assets/images/Login_schwab2.PNG"></img><br /></td></tr></table></p>
                   <p><br />There is obviously no Firsty Platypus Bank, but during a real link you'd be on Schwab's website. This is proccess of connecting directly to your institution is a lot more secure because you're never giving any credential to us or CFL, and it enables your institution to also add things like two-factor authentication via SMS, e-mail, phone call, etc.</p>
                   <p><br /><b>Whichever you used</b>, Plaid sends back to the CFL client-side application a <b>public token</b>. That public token is very short lived (4 hours), and once it is paired with CFL keys can be exchanged for an <b>access token</b>. So the client-side applicant forwards the public token to the server-side application, which using keys exchanges the public token for the access token.</p>
                   </p>
                 
            ) : (
                <h4 className={styles.subtitle}>
                  <Callout warning>
                    Unable to create an item. Please check your backend server
                  </Callout>
                </h4>
            )}
            <div className={styles.itemAccessContainer}>
              <p className={styles.itemAccessRow}>
                <span className={styles.idName}>item_id</span>
                <span className={styles.tokenText}>{itemId}</span>
              </p>

              <p className={styles.itemAccessRow}>
                <span className={styles.idName}>access_token</span>
                <span className={styles.tokenText}>{accessToken}</span>
              </p>
            </div>
            {isItemAccess && (
                <p className={styles.requests}>
                  <p>The item is a unique identifier for your account within Plaid, and the access token is what Plaid gives the CFL as proof that it has the right to read from your account with the permissions you've approved. In reality, neither of those should ever been shown or shared - especially not in your browser.</p>
                <p><br /><br /><h4>2. What happens next?</h4><br /></p>
                <p>Now that CFL has an access token, it can initiate a request to Plaid to request information from your account based on the permissions necessary and granted.<br /><br /></p>
                <p>To do so, we use Plaid's API endpoints. Endpoints are locations that allow for information exchange, and Plaid has several available. For this particular study, we need to access the user's transactions so we make use of the <a href="https://plaid.com/docs/api/products/transactions/">transactions endpoint</a></p>
                <p><br />First, click the "verify eligibility" button of the <b>transactions list</b> to see what transactions can be retrieved from the account you linked. Second, click the <b>Uber Study</b>. If your transactions have at least one uber transaction listed, it'll display an ugly "Open Qualitrics Survey link" button.</p>                
                <p><br />Note that for this study, <b>no information is stored by CFL</b>. That means that the item, access token, transactions or verification status cannot be retrived or associated to the Qualtrics survey. A participant only sees the Qualtrics survey link, with appended embedded data, if they have met the inclusion criteria.</p>
                </p>
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
