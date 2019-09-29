import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default (gon, username) => {
  ReactDOM.render(
    <Provider store={store}>
      <App gon={gon} username={username} />
    </Provider>, document.getElementById('chat'),
  );
};
