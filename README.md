# FirePoll
A real-time responsive voting app with react.js + redux + firebase, UX powered by React Material UI.

<img src="./header.png"/>

### Prerequisites
create a new project on FireBase and get the API credential to establish the connection with firebase.


If you have no experience with `firebase`, please read [here](https://firebase.google

### Installing

To run the app locally, the following credentials need to be added to `.env`
```bash
REACT_APP_FIREBASE_KEY=""
REACT_APP_FIREBASE_DOMAIN=""
REACT_APP_FIREBASE_DATABASE=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_SENDER_ID=""
```
If you have no experience with `firebase`, please read [here](https://firebase.google.com/docs/web/setup)

## Deployment

The live demo is hosted with free service on [netlify.com](https://www.netlify.com/)


## License
MIT

## Todos (🔥 open, ✔ ︎done)
- use State Manager: Redux 🔥
- add unit tests 🔥

- create pages
    - install router ✔︎
    - integrate router dom in app and create pages ✔︎
- build the work flow ✔︎
    1. user adds a new question ✔︎
    2. user is redirected to the next page: vote form page ✔︎
    3. user gives a vote to the question ✔︎
    4. user is redirected to the next page:  charts page ✔︎
   
- customize the navigation header
    - just have one link "create new poll(link to home)" ✔︎
    
- make the views mobile friendly
    - question ✔︎
    - vote ✔︎
    - chart ✔︎

## Bugs
- votePage: vote still possible, if no option selected ✔︎

    
    
