# Vargtimma

Front- and backend for the community app Vargtimma

## Stack & code standard

- BE: Node.js & Express
- DB: MongoDB
- Socket.io
- FE: React
- Typescript
- Bootstrap

## Get started

- Clone the project
- Run "npm i" to install dependencies
- Set up one .env in the root of BE-folder and one .env in /FE/vargtimma.

  - BE variables:
    - PORT
    - SOCKET_PORT
    - MONGO_CONNECTION_STRING
    - MONGO_DB_NAME
    - JWT_SECRET
    - REQUEST_URL
  - FE variables:
    - REACT_APP_API_URL
    - REACT_APP_SOCKET_URL

## Site structure FE

| Path                  | Description                                   |
| --------------------- | --------------------------------------------- |
| pages/HomePage.tsx    | Default view after successful login           |
| pages/LandingPage.tsx | Default view before login                     |
| pages/admin           | Dashboard for an admin or moderator           |
| pages/community       | Community chat page                           |
| pages/users           | Login page & register new user page resources |
| pages/contacts        | Not yet implemented in the app                |

## Database structure

| Collection     | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| MongoDB        | Connection to MongoDB - Compass locally and Atlas in prod                                                  |
| BlacklistDB    | Stores blacklisted credentials for blocked users                                                           |
| ReportedUserDB | Stores a report including who was reported, who reported them and a reason to why they reported the person |
| UsersDB        | Stores information about registered users                                                                  |

## Socket server

Currently only works in dev.

## Deploys

- FE: https://vargtimma.netlify.app/
- BE: Deployed on Render https://dashboard.render.com/. Render is a free hosting service and stop the webservice after 15 minutes of inactivity. It can take ~5 minutes before the BE is up and running after sending a request.

## Future features

- Add contacts
- Personal chat rooms
- Calls
- Share coordinates with contacts in personal chat
- See online status in chat and on contacts page
- Mark oneself as being in distress
- BankID authentication
- Set a timer for when one is expected to be home
