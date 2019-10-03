import gon from 'gon';
import openSocket from 'socket.io-client';
import { fake } from 'faker';
import cookies from 'js-cookie';
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

const username = fake('{{name.lastName}} {{name.firstName}}');
cookies.set('username', username);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const { messages, channels } = gon;
store.dispatch(actions.getDataFromGon({ messages, channels }));

const io = openSocket();

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

export default () => {
  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
