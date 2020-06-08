import { ADD_PLAYER } from "./actions";

const initialState = {
  players: [],
  currentPlayerIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    default:
      return state;
  }
};
