BinaryBod

To run this project:

First create the database locally through phpMyAdmin, using the `binaryBod.sql` file. Under privileges, add a new user with the username test, and password test. Make sure that the MySQL Database server is up and running.

Second, after opening the project repository, open a terminal, and do `cd ~/BinaryBod/backend`, then do `npm install`. You may have to do `nom install --force`. Then, do the command `npm run start` to start the backend. 

Third, open another terminal window, and do `cd ~/BinaryBod/frontend/frontend` (yes there are two frontend folders, that was a mistake, whoops!), then do `npm install`. You may have to do `nom install --force`. Then, do the command `npm start` to run the backend. If prompted to open on another port, say `y`. 

Finally, put `http://localhost:3001` into your browser to view the website!

This project was developed using TypeScript for both the backend and frontend. The backend uses Node.js with Express for the server and MySQL as the database, along with nodemon for automatic server restarts during development. The frontend is built with React and MUI (Material-UI) for the user interface components, and axios for making HTTP requests. The project also uses TSX to support TypeScript with JSX syntax.

Components were from https://mui.com/base-ui/all-components/, and the sign in and log in are from https://mui.com/material-ui/getting-started/templates/.

The structure:

BinaryBod/ is the root directory.
  
  backend/ contains the server-side code, with `routes.ts` being where the majority of our routes are.
    
    auth/ contains authentication-related code, with the routes for logging in and signing up.
  
  frontend/ contains the client-side code.
  
    frontend/ (was an accident)
  
    public/ contains publicly accessible files and was created by React.
      
    src/ contains the source code for the frontend, with `App.tsx` containing the frontend routing.
      
      components/ contains the majority of the frontend code, with almost every file being a new page.
