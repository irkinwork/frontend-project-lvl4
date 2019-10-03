import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import init from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
init();
