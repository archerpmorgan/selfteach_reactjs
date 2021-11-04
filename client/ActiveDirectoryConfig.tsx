import { Configuration, PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration
export const aadconfig: Configuration = {
    auth: {
      clientId: "463bb9a0-89d1-435f-b683-e8b4272c505c",
      authority: "https://login.microsoftonline.com/0e5ca666-dfc9-48f5-8ac6-bd796fada0c7",
      redirectUri: "http://localhost:3000/",
      postLogoutRedirectUri: 'http://localhost:3000/'
    },
  };

 export const accessTokenRequest = {
    scopes: ["api://e1c818fb-aa40-4da6-9464-01649d1935c0/data.read", "api://e1c818fb-aa40-4da6-9464-01649d1935c0/data.write"],
    authority:
      "https://login.microsoftonline.com/0e5ca666-dfc9-48f5-8ac6-bd796fada0c7",
  };

  export const msalInstance = new PublicClientApplication(aadconfig);
