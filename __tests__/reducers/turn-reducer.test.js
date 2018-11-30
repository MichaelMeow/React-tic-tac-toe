import turnReducer from './../../src/reducers/turnReducer';
import defaultTurnState from './../../src/reducers/defaultTurnState';

describe("turnReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(turnReducer({}, { type: null })).toEqual({});
  });

  test('Should change step to payload input', () => {
    expect(turnReducer(defaultTurnState, {
        type: 'STEP',
        step: 1
      })).toEqual({
        stepNumber: 1,
        xIsNext: false
      });
  });

  test('Should advance stepNumber by 1 and switch xIsNext on a board click action', () => {
    expect(turnReducer({
      stepNumber: 4,
      xIsNext: true
    }, { type: 'CLICK' })).toEqual({
      stepNumber: 5,
      xIsNext: false
    });
  });

});
