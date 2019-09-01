import openSocket from 'socket.io-client';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import init from './index.jsx';

const io = openSocket();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const user = faker.fake('{{internet.userName}}');

cookies.set('user', user);

init(gon, io);
