import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx';

export default (gon) => {
  ReactDOM.render(<App gon={gon} />, document.getElementById('chat'));
};
