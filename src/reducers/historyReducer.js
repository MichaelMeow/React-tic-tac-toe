import defaultHistorySlice from './defaultHistorySlice.js'

export default (state = defaultHistorySlice, action) => {
  const history = state.history.slice(0, action.stepNumber + 1);
  const current = history.length - 1;
  const pos = action.position;
  let stateDupe = Object.assign({}, state);

  switch (action.type) {
  case 'CLICK':
    if (history[current].squares[pos]) {
      return state;
    } else {
      stateDupe.history = history;
      let squaresDupe = stateDupe.history[current].squares.slice();
      let squaresOriginal = stateDupe.history[current].squares;
      squaresDupe[pos] = action.xIsNext ? 'X' : 'O';
      stateDupe.history.push({squares: squaresDupe});
      }
    return stateDupe;
  case 'CHECK_WINNER':
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ];
    for (let i = 0; i < 8; i++) {
      const [a,b,c] = lines[i];
      if (stateDupe.history[current + 1].squares[a] == stateDupe.history[current + 1].squares[b] && stateDupe.history[current + 1].squares[b] == stateDupe.history[current + 1].squares[c] && stateDupe.history[current + 1].squares[a]) {
        console.log('what up');
        stateDupe.winner = stateDupe.history[current + 1].squares[a];
      }
    }
    return stateDupe;
  default:
    return state;
  }
};
