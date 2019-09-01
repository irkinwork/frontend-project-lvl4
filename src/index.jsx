import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './containers/App.jsx';
import * as actions from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default (gon, io) => {
  io.on('newMessage', (msg) => {
    const { data } = msg;
    store.dispatch(actions.addMessageToStore(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <App gon={gon} io={io} />
    </Provider>, document.getElementById('chat'),
  );
};
