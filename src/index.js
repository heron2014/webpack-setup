import React from 'react';
import ReactDOM from 'react-dom';

require('./style/main.css');

class App extends React.Component {
  render () {
    return <h1> I love React!!!</h1>
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
