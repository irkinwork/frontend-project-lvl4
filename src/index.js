import gon from 'gon';
import cookies from 'js-cookie';
import { fake } from 'faker';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import init from './init';

const username = fake('{{name.lastName}} {{name.firstName}}');
cookies.set('username', username);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
init(gon, username);
