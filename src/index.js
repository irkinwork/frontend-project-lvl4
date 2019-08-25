import gon from 'gon';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import init from './init';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(gon);