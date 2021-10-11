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



## Book Ingestion

Q. How can a user access a book for use in his/her personal account?
A. There is a centralized store of books available which anyone can rope into their bookset.

Q. How do books get added to the centralized book repository?
A. The service Admin can upload any book using a standard format. Also, any user may upload an ingest request using the form to be approved by the Admin. If approved, the book is available for all to use. 

Q. What is the standard format?
A. See here for documentation

### Implementation

Each user has a personal library from which problem sets are created and which can be browsed.

Users suggest a new book upload a template file to the website, which gets validated and processed by the azure function. 

Azure function bookTemplateProcessor takes a template file, validates it, and returns the json representation of the file for storage. Is a C# HttpTrigger hosted in Azure.

The admin may approve for release to public library. 


## How to run

from the command line, run 

    `npm install`

To download the node packages. Then, run

    `npm start`


Ideas for this project:

- style like the best parts of mathematics professors' janky old websites 
- When choosing problems, the first ~ quarter or so of the section should be given in sequence, but the rest should be randomized
- Marker placed on problem stopped at
- investigate and implement best practices as applicable for python code modules
- web page with graphics on progress through different books
- deploy with terraform
- do cli the right pythonic way with documentation
- add date studied to book sections table
- enable description of prioritization of different books (for example, as number between 1,100)
- selection of problems should guarantee the first n and then pick randomly?
- everything that calls the sqlite api has no notion of primary key ids. just human readable information
- probably going with a python web framework like flask or django
    https://docs.python-guide.org/scenarios/web/
- should be able to ingest from gui to json to database
- add command line -h option for detailed list of all commands
- make executable command line package 
- explicitly specify problems completed outside of a more
- inchoate check if malformed before extending
- write project summary: What learned, what went well and not, how to use (perhaps that goes in the README), tech stack, etc.
- better method for chapters studied. Have one sections file per book with all the sections present. Then place an X next to the section of it has been studied and leave nothing there if it hasnt
- Expand to include theorems from the text