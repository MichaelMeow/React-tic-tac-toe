import historyReducer from './../../src/reducers/historyReducer';
import defaultHistorySlice from './../../src/reducers/defaultHistorySlice';

const midGameHistorySlice = {
  history: [
    { squares: Array(9).fill(null) },
    { squares: [null, null, 'X', null, null, null, null, null, null] }
  ]
};
const winningHistorySlice = {
  history: [
    { squares: ['X', 'X', null, null, null, null, null, null, null] }
  ]
};

describe("historyReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(historyReducer(defaultHistorySlice, { type: null })).toEqual({
      history: [{
        squares: Array(9).fill(null)
      }]
    });
  });

  test('Should return X in first position with first click on position 0', () => {
    expect(historyReducer(
      defaultHistorySlice,
      {
        type: 'CLICK',
        position: 0,
        xIsNext: true
      }
    ).history[1])
    .toEqual(
      {
        squares: ['X', null, null, null, null, null, null, null, null]
      }
    );
  });

  test('Should take no action if a square with a mark is clicked', () => {
    expect(historyReducer(midGameHistorySlice, {
      type: 'CLICK',
      position: 2,
      xIsNext: false
    })
  ).toEqual(
    {
      history: [
        { squares: Array(9).fill(null) },
        { squares: [null, null, 'X', null, null, null, null, null, null] }
      ]
    });
  });

  test('Should declare winner if win condition is met', () => {
    expect(historyReducer(winningHistorySlice, {
      type: 'CLICK',
      position: 2,
      xIsNext: true
    }).winner
  ).toEqual('X')
  })

});
