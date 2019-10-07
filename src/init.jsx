import openSocket from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import * as actions from './actions';
import App from './components/App';
import UserContext from './UserContext';

export default (gon, username) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
  const io = openSocket();

  store.dispatch(actions.getDataFromGon(gon));

  io.on('newMessage', (msg) => {
    const { data } = msg;
    store.dispatch(actions.addMessageToStore(data));
  });

  io.on('newChannel', (channel) => {
    const { data } = channel;
    store.dispatch(actions.addChannelToStore(data));
  });

  io.on('removeChannel', (channel) => {
    const { data: { id, name } } = channel;
    const { currentChannelId } = store.getState();
    const data = { id, name, currentChannelId };
    store.dispatch(actions.removeChannelFromStore(data));
  });

  io.on('renameChannel', (channel) => {
    const { data } = channel;
    store.dispatch(actions.renameChannelFromStore(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
