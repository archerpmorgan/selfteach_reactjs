# About the Project

This is a web app that manages my self study using mathematics textbooks. I have always been fond of textbooks, and reading them and doing the exercises inside them is a crucial step to learning math. (The second step is to use the math for your own projects--to do something or try to understand the world.)

This app allows me to track me progress through a changing set of textbooks. I can ask for a problem set to be generated automatically, with problems being pulled from chapters from each of them that I have read.

Currently the single user is Me, Archer Morgan.

## Development Notes

External resource dependencies:
- AAD app registrations for client and server
- Cosmos DB, Bob storage account

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
- https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md (msal for react)
- https://docs.microsoft.com/en-us/azure/api-management/api-management-howto-protect-backend-with-aad (AAD configuration for oauth flow)


Ideas/TODO

Steps:

0. protect api endpoints
1.  testing and perf testing and bug bash
2.  Think devops and deployment
3.  Unify styling
    1.  brand the AAD tenant so that signin popup has my logo
   1. pluralsight styling with react course
   2. inspiration for style like the best parts of mathematics professors' janky old websites 
4.  4. Complete the About page, add description of the project, tech used, how to use
5.  Writeup of project with experience gained etc.


optional additional features:
- Utilize the Date Studied field 
- Add more vizualizations 
- add a form in problem set to be more exact about what you want (currently just takes from all books)
