# Development Notes

Tech stack

- frontend: React, material ui, Redux, axios, victory, recharts
- backend: Node
- data: CosmosDB, Blob storage
# installed packages
- react-router-dom

## references used along the way
- https://github.com/briancodex/react-navbar-v1/blob/master/src/components/Navbar/Navbar.js
- https://www.youtube.com/watch?v=Law7wfdg_ls (routing)
- https://www.youtube.com/watch?v=CVpUuw9XSjY (redux)
- https://www.youtube.com/watch?v=ngc9gnGgUdA (full stack)


Ideas/TODO

Steps:

1. ~~Edit the sections and problems in a section to reflect completion and date of completion~~
2. ~~Problem set, be able to create a new one or complete an existing one, marker at problem left off on~~
3.  Ingests tab, includes description of ingests format, does validation, takes photo, puts photo in Blob storage, start serving images from blob
    1.  Add support for Linear Algebra Done right, probably by removing all hardcoding that cares precisely what books there are in there
4. Clean up the data model, which components have what data and when, make sure API is RESTful
4.  User Login, single tenant, secret management
5.  testing and perf testing and bug bash
6.  Think devops and deployment
7.  Unify styling
   1. pluralsight styling with react course
   2. inspiration for style like the best parts of mathematics professors' janky old websites 
8.  4. Complete the About page, add description of the project, tech used, how to use
9.  Writeup of project with experience gained etc.


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


## How to run

from the command line, run 

    `npm install`

To download the node packages. Then, run

    `npm start`