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
export const saveScore = (playerId, score) => {
  return {
    type: SAVE_SCORE,
    playerId,
    score,
  };
};
export const nextPlayer = (currentPlayerId) => {
  return {
    type: NEXT_PLAYER,
    currentPlayerId,
  };
};
export const countingWins = (playerIndex) => {
  return {
    type: COUNT_WIN,
    playerIndex,
  };
};
export const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};
