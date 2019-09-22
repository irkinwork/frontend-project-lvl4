import openSocket from 'socket.io-client';
import { fake } from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import init, { store } from './init';
import * as actions from './actions';

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
  const { data } = channel;
  store.dispatch(actions.removeChannelFromStore(data));
});

io.on('renameChannel', (channel) => {
  const { data } = channel;
  store.dispatch(actions.renameChannelFromStore(data));
});

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const user = fake('{{name.lastName}} {{name.firstName}}');
cookies.set('user', user);

init(gon);
