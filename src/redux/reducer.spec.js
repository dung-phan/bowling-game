import { ADD_PLAYER } from "./actions";
import gameReducer, { initialState } from "./reducer";
describe("Game reducer", () => {
  it("Should return default state", () => {
    const newState = gameReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });
  it("Should return new state if receiving a new player", () => {
    expect(
      gameReducer(initialState, {
        type: ADD_PLAYER,
        player: {
          id: "123XYZ",
          playerName: "John",
          rolls: [],
          currentRollIndex: 0,
          winningTimes: 0,
        },
      })
    ).toEqual({
      ...initialState,
      players: [
        {
          id: "123XYZ",
          playerName: "John",
          rolls: [],
          currentRollIndex: 0,
          winningTimes: 0,
        },
      ],
      rolls: [[]],
    });
  });
});
