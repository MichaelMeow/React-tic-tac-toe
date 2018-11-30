import rootReducer from './../../src/reducers/index';

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      historySlice: {
        history: [{
          squares: Array(9).fill(null),
        }]
      },
      turnSlice: {
        stepNumber: 0,
        xIsNext: true
      },
    });
  });

});
