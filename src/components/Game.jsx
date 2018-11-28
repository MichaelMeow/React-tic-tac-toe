import React from 'react';
import Board from './Board';
import v4 from 'uuid';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares: squares,}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
    // this.calculateWinner();
  }

  // calculateWinner() {
  //   let winner = null;
  //   const lines = [
  //     [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  //   ];
  //   for (let i = 0; i < 8; i++) {
  //     const [a,b,c] = lines[i];
  //     if (this.state.squares[a] == this.state.squares[b] && this.state.squares[b] == this.state.squares[c] && this.state.squares[a]) {
  //       console.log('WINNER!!!');
  //       winner = this.state.squares[a];
  //     }
  //   }
  //   this.setState({winner: winner});
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   let checkWinner;
  //   for (let i = 0; i < 8; i++) {
  //     if (prevState.squares[i] !== this.state.squares[i]) {
  //       checkWinner = true;
  //     }
  //   }
  //   if (checkWinner) {
  //     this.calculateWinner();
  //   }
  // }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // const winner = calculateWinner(current.squares);

    // let status;
    //     if (winner) {
    //       status = 'Winner: ' + winner;
    //     } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move # ${move}` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
