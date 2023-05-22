import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reducers from './reducers/index.js'
import thunk from 'redux-thunk'
import {legacy_createStore as createStore, applyMiddleware,compose} from 'redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';

const store = createStore(reducers,compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
       <GoogleOAuthProvider clientId="736488580378-pho2d2n0tvkdb4can6ppi5oqhsa8ess3.apps.googleusercontent.com">
   <Provider store={store}>
       <App />
   </Provider>
       </GoogleOAuthProvider>
 
);

