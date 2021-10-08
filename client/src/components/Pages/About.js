import React from "react";
import "../../App.css";
import { useIsAuthenticated } from "@azure/msal-react";
import ReactMarkdown from 'react-markdown'
import { Container, Paper } from "@material-ui/core";

function About() {
  const isAuthenticated = useIsAuthenticated();

  const filestring = `# About the Project

  This is a web app that manages my self study using mathematics textbooks. I have always been fond of textbooks, and reading them and doing the exercises inside them is a crucial step to learning math. (The second step is to use the math for your own projects--to do something or try to understand the world.)
  
  This app allows me to track me progress through a changing set of textbooks. I can ask for a problem set to be generated automatically, with problems being pulled from chapters from each of them that I have read.
  
  Currently the single user is Me, Archer Morgan.
  
  ## Development Notes
  
  Tech stack
  
  - frontend: React, material ui, Redux, axios, victory, recharts
  - backend: Node
  - data: CosmosDB, Blob storage
  - Identity: AAD, msal-browser
  
  ## references used along the way
  - https://github.com/briancodex/react-navbar-v1/blob/master/src/components/Navbar/Navbar.js
  - https://www.youtube.com/watch?v=Law7wfdg_ls (routing)
  - https://www.youtube.com/watch?v=CVpUuw9XSjY (redux)
  - https://www.youtube.com/watch?v=ngc9gnGgUdA (full stack)
  - https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md ()
  
  
  Ideas/TODO
  
  Steps:
  
  1.  User Login, single tenant, secret management
      1.  add readme markdown to about page
      2.  toggle navigability in the nav bar depending on logged in
      3.  add app registration for the app to azure ad
      4.  implement login on about page
  2.  testing and perf testing and bug bash
  3.  Think devops and deployment
  4.  Unify styling
     1. pluralsight styling with react course
     2. inspiration for style like the best parts of mathematics professors' janky old websites 
  5.  4. Complete the About page, add description of the project, tech used, how to use
  6.  Writeup of project with experience gained etc.
  
  
  optional additional features:
  - Utilize the Date Studied field 
  - Add more vizualizations 
  - add a form in problem set to be more exact about what you want (currently just takes from all books)
  `;

  return (
    <div>
      <h1>
      </h1>
      <Container style={{paddingTop: "6rem"}}>
        <Paper>
          <ReactMarkdown>
            {filestring}
          </ReactMarkdown>
        </Paper>
      </Container>
    </div>
  );
}

export default About;
