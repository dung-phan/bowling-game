import { v4 as uuid } from "uuid";
export const ADD_PLAYER = "ADD_PLAYER";
export const SAVE_SCORE = "SAVE_SCORE";
export const NEXT_PLAYER = "NEXT_PLAYER";
export const COUNT_WIN = "COUNT_WIN";
export const RESET_GAME = "RESET_GAME";

export const addNewPlayer = (playerName) => {
  return {
    type: ADD_PLAYER,
    player: {
      id: uuid(),
      playerName,
      rolls: [],
      currentRollIndex: 0,
      winningTimes: 0,
    },
  };
};
