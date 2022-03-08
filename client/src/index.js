import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import {AppProvider} from "./context/appContext"

ReactDOM.render(
  <Router>
    <AppProvider>
    <App />
    </AppProvider>
  </Router>,
  document.getElementById('root')
);


