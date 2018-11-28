import React from 'react';
import Game from './Game'

class App extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render(){
    return (
      <div>
        <Game />
      </div>
    );
  }
}

export default App;
