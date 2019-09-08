import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './components/App.jsx';
import * as actions from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default (gon, io) => {
  io.on('newMessage', (msg) => {
    const { data } = msg;
    store.dispatch(actions.addMessageToStore(data));
  });

  io.on('newChannel', (channel) => {
    const { data } = channel;
    store.dispatch(actions.addChannelToStore(data));
  });

  io.on('removeChannel', (channel) => {
    const { data } = channel;
    store.dispatch(actions.removeChannelFromStore(data));
  });

  io.on('renameChannel', (channel) => {
    const { data } = channel;
    store.dispatch(actions.renameChannelFromStore(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <App gon={gon} />
    </Provider>, document.getElementById('chat'),
  );
};
