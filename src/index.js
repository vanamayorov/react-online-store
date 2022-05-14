import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppWrapper from './hoc/AppWrapper';
import { BrowserRouter as Router } from 'react-router-dom';

import "rsuite/dist/rsuite.min.css";
import './styles/bootstrap.min.css';
import './styles/index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper>
      <Router>
        <App />
      </Router>
    </AppWrapper>
  </React.StrictMode>
);

