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

## How to run

from the command line, run 

    `npm install`

To download the node packages. Then, run

    `npm start`




Workback notes

Start with Project summary from where I am now, and where I want to be, and the steps I will take in order, Sort of like a journal of the process. 

Each gets 2 waves. (1) Low hanging fruit, (2) nice to haves. The nice to haves will be compiled throughout the course of phase 1. Phase 1 will be decided upon in advance.

Step 1: create new git repo for the project. Create a new react-node app from scratch that is JavaScript, not TypeScript, move all old code over. 
https://blog.logrocket.com/mern-stack-tutorial/
https://javascript.plainenglish.io/building-a-spa-with-react-and-node-cef18dccef17
Use correct package management and git hygeine with ignores and stuff. Document this process. Collect all steps, tips, and notes into a running journal while going. 

Major areas

Features 
- What feature set makes the app complete? (without styling)
Everything I do I want to be easy

What is the definition of done for the features the app provides?

I have a landing page that looks nice and describes the product

I have a library of books that I am making progress through
    - I can see my progress through any book in fine grained and high level form
    - I can edit the data associated with any book without going into storage, including marking a chapter as "studied" and thus elligible to be used in a problem set
    - I can add books to and remove books from this personal library seamlessly

I can autogenerate problem sets from the books I am studying
    - I can generate a new problem set from uncompleted problems in the textbooks in my library
        Sub-criteria (form):
        - select which books participate
        - specify number of problems
        - Chapter and book are selected randomly (must have already studied), but once that is pinned down, the "next" problem is selected in order
    - I have a list of current problem sets, I can view or edit any of them
    - I can mark individual problems on the problem set as complete
    - I can "complete" a problem set, with the affect that all the problems from the set get marked as complete in the data for the books
    - I can delete a problem set
    - (stretch) I can view the history of completed problem sets, and store the files from my work on the and view those as well

Durability 
- App is well-tested, and durable to strange user interactions
- App is impossible to break in happy path, and is not easy to break in wrecking ball path

Users, AuthE/AuthZ, protected API, security
- User must login to view and edit his data
- The architecture of the system allows for multiple users
- service handles secrets correctly

DevOps

- I have a fast automated build pipeline
    - gated on lint, tests, coverage
- I have a reliable, low-cost hosting platform
- Deployments are quick, automated, and easy
- I can easily spin up a local or/and cloud-based test enviroment
- I can easily deploy application infrastructure in an automated way
- Package management makes code dependencies easy

Language/Framework/Tech Stack
- JS - after having written the app so that it just *works* it is rewritten to be elegant, idiomatic Javascript
- The code is sensibly organized
- Cloud storage is used well in terms of data model and features used for data type. Cost is low and performance is high. 

Style/layout/Design
- style like the best parts of mathematics professors' janky old websites, but do so in a modern way framework-wise
- Create a logo using someone like Mira or Emery to help me so I can see the logo making process
- (Stretch) works on mobile and desktop

TypeScript
- The project is converted from Javascript to Typescript, and this conversion actually provides value to the project