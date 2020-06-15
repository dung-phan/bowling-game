import {
  ADD_PLAYER,
  SAVE_SCORE,
  NEXT_PLAYER,
  RESET_GAME,
  COUNT_WIN,
} from "./actions";
import gameReducer, { initialState } from "./reducer";
describe("Game reducer", () => {
  it("Should return default state", () => {
    console.log("what initial state", initialState);
    const newState = gameReducer(undefined, {});
    expect(newState).toEqual({ currentPlayerIndex: 0, players: [], rolls: [] });
  });
  it("Should return new state if receiving action payload", () => {
    const newState = gameReducer(undefined, {
      type: ADD_PLAYER,
      payload: {
        id: "Test1",
        name: "Test",
      },
    });
    expect(newState).toEqual({
      currentPlayerIndex: 0,
      players: [
        {
          id: "Test1",
          playerName: "Test",
          rolls: [],
          currentRollIndex: 0,
          winningTimes: 0,
        },
      ],
      rolls: [[]],
    });
  });
});
