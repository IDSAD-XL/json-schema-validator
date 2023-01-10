import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Styles/index.scss';
import App from './App';
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import schemesReducer from "./Redux/reducers";

const store: Store<SchemesState, SchemaAction> & {
    dispatch: DispatchType
} = createStore(schemesReducer, applyMiddleware(thunk))

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
