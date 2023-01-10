import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Styles/index.scss';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./Redux/store";

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
