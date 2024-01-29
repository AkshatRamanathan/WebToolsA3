# WebDesign 6250

Professor: Ashwin Dsousa

## Assignment 3

Topic: ExpressJS Session | Session Management System Middleware

### Stack

- HTML
- NodeJS
- ExpressJS

### Assumptions

1. Session middleware functionality
    - try to fetch sessionId cookie
    - if not present, create it for the response
    - if locals sessions (in-memory store) isnt present, initialize it
    - fetch the data from store and set to req.session
    - set the generated/existing sessionid to req.sessionId
    - reset session data (might be modified) into store

1. Authentication (verification) middleware functionality
    - fetch sessionId from cookie
    - if no Id, respond with forbidden
    - if id exists, fetch data from the store and set to req.session

1. Session middleware runs only on creation routes (login, reg, etc)
1. Auth middleware runs on pretected routes
