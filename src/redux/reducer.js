import {
  ADD_PLAYER,
  SAVE_SCORE,
  NEXT_PLAYER,
  RESET_GAME,
  COUNT_WIN,
} from "./actions";

const initialState = {
  players: [],
  currentPlayerIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case SAVE_SCORE:
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === action.playerId) {
            return {
              ...player,
              rolls: { ...action.score },
              currentRollIndex: player.currentRollIndex + 1,
            };
          }
          return player;
        }),
      };
    case NEXT_PLAYER:
      if (action.currentPlayerId < state.players.length - 1) {
        return {
          ...state,
          currentPlayerIndex: action.currentPlayerId + 1,
        };
      } else {
        return {
          ...state,
          currentPlayerIndex: 0,
        };
      }

    case COUNT_WIN:
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === action.playerIndex) {
            return {
              ...player,
              winningTimes: player.winningTimes + 1,
            };
          }
          return player;
        }),
      };
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
};
