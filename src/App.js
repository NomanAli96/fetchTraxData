import "./App.css";
import { Amplify, Auth, Hub, API } from "aws-amplify";
import { useEffect } from "react";
// import Dashboard from './UI/Pages/Dashboard/Dashboard';
// import AwsConfig from './aws-exports'
// import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig)

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_Mju502N9c",
    userPoolWebClientId: "23kob23o1lctnj22k68ss4o3m8",
    mandatorySignIn: true,
    oauth: {
      domain: "elephant-trax-test.auth.us-east-1.amazoncognito.com",
      scope: [
        "phone",
        "email",
        "openid",
        "aws.cognito.signin.user.admin",
        "profile",
      ],
      redirectSignIn: "http://localhost:3000/",
      // redirectSignOut: 'http"//localhost:3000/',
      responseType: "code",
    },
  },
  API: {
    endpoints: [
      {
        name: "InventoryAPI",
        endpoint:
          "https://onjgetjec0.execute-api.us-east-1.amazonaws.com/Stage",
      },
      {
        name: "amplify-invmngthoughtspawnco-dev-174255",
        endpoint: "https://api.my-custom-cloudfront-domain.com",
      },
    ],
  },
});

function App() {
  // console.log("api", API);
  Auth.currentAuthenticatedUser({
    bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then((user) => {})
    .catch((err) => console.log(err));

  Hub.listen("auth", (data) => {
    // console.log("🚀 ~ file: App.js ~ line 28 ~ Hub.listen ~ data", data);
  });

  const FetchInventoryData = () => {
    fetch(
      "https://onjgetjec0.execute-api.us-east-1.amazonaws.com/Stage/api/inventoryapi/userpref/af4d389e-4fd6-4eac-948a-a8dd8f1a407d", {
        credentials: 'include'
      }
    )
      .then((response) => response.json())
      .then((data) => console.log('fetch data',data))
      .catch((err)=>console.log('error fetching data',err))
  };
  // const myInit = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  // };
  // API.get(
  //   "InventoryAPI",
  //   "/api/inventoryapi/userpref/af4d389e-4fd6-4eac-948a-a8dd8f1a407d",
  //   myInit
  // )
  //   .then((response) => {
  //     console.log("🚀 ~ file: App.js ~ line 46 ~ .then ~ response", response);
  //   })
  //   .catch((error) => {
  //     console.log("error fetch data", error);
  //   });

  return (
    <div className="App">
      <h1>dashboard</h1>

      <button onClick={() => FetchInventoryData()}>Fetch Data</button>
    </div>
  );
}

export default App;
