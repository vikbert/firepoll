import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import PollAppBar from "./components/common/appBar";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const primaryPurple = '#7b2182';
const theme = createMuiTheme({
    palette: {
      primary: {
        main: primaryPurple,
      },
    },
  },
);

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <PollAppBar/>
      <App/>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
