import defaultTurnState from './defaultTurnState.js'

export default (state = defaultTurnState, action) => {
  let newTurnState;
  switch (action.type) {
  case 'STEP':
    newTurnState = Object.assign({}, state);
    newTurnState.stepNumber = action.step;
    newTurnState.xIsNext = ((action.step % 2) === 0);
    return newTurnState;
  case 'CLICK':
    newTurnState = Object.assign({}, state);
    newTurnState.stepNumber += 1;
    newTurnState.xIsNext = !newTurnState.xIsNext;
    return newTurnState;
  default:
    return state;
  }
};
