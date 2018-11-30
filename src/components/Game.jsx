import React from 'react';
import Board from './Board';
import v4 from 'uuid';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      }
    };
  //
  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0
  //   });
  // }
  //
  // handleClick(i) {
  //   const history = this.state.history.slice(0, this.state.stepNumber + 1);
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();
  //   if (squares[i] !== null) { return null; }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     history: history.concat([{squares: squares,}]),
  //     xIsNext: !this.state.xIsNext,
  //     stepNumber: history.length
  //   });
  //   // this.calculateWinner();
  // }
  //
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

  jumpTo(move) {
    const { dispatch } = this.props;
    const action = {
      type: 'STEP',
      step: move
    }
    dispatch(action);
  }

  handleClick(i) {
    const currentGameBoard = this.props.history;
    const stepNumber = this.props.stepNumber;
    if (currentGameBoard[stepNumber].squares[i] || this.props.winner) {
      return;
    } else {
      const { dispatch } = this.props;
      const action = {
        type: 'CLICK',
        position: i,
        xIsNext: this.props.xIsNext,
        stepNumber: stepNumber
      }
      dispatch(action);
    }
  }

  render() {
    const { dispatch } = this.props;
    dispatch({ type: 'CHECK_WINNER', position: this.props.stepNumber });
    const history = this.props.history;
    const current = history[this.props.stepNumber];
    let winner = this.props.winner;
    let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
      }

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

const mapStateToProps = state => {
  return {
    history: state.historySlice.history,
    winner: state.historySlice.winner,
    stepNumber: state.turnSlice.stepNumber,
    xIsNext: state.turnSlice.xIsNext
  }
}

export default connect(mapStateToProps)(Game);
