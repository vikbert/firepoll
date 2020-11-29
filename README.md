<div align="center">
  <!-- Logo and title and sub-title -->
  <img src="https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png" alt="logo" width="80"/>
  <h1 style="font-weight: bolder; color: black; margin-top: 0px">FirePoll</h1>
  <h3 style="color: darkgrey; margin: 40px 0"> 
    A realtime Voting App based on firebase
  </h3>

  <!-- description of project -->
  <p>
    Polling App based on ReactJS + Redux + Firebase for the realtime voting. UX based on React Material UI.
  </p>

  <!-- github icons for PR and License -->
  <p>
    <a href="#">
      <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
    </a>
    <a href="#">
      <img src="https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square" alt="MIT License">
    </a>
  </p>
</div>

---

## Screenshots

A real-time responsive voting app with 

<img src="./header.png"/>

### Prerequisites
create a new project on FireBase and get the API credential to establish the connection with firebase.


If you have no experience with `firebase`, please read [here](https://firebase.google.com/docs/web/setup)

### Installing

To run the app locally, the following credentials need to be added to `.env`
```bash
## rename .env.dist to .env, then add the credential which you got from firebase console.
REACT_APP_FIREBASE_KEY=""
REACT_APP_FIREBASE_DOMAIN=""
REACT_APP_FIREBASE_DATABASE=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_SENDER_ID=""
```
If you have no experience with `firebase`, please read [here](https://firebase.google.com/docs/web/setup)

## start
    yarn install
    yarn start
    
## Deployment

The live demo is hosted with free service on [netlify.com](https://www.netlify.com)


## Bugs
- votePage: vote still possible, if no option selected ✔︎


## License
MIT
