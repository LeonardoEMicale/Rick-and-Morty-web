import { ADD_FAV, REMOVE_FAV, ORDER, FILTER } from "./action-type";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV:
      /*return {
        ...state,
        myFavorites: [...state.allCharacters, action.payload],
        allCharacters: [...state.allCharacters, action.payload]
      };*/
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case REMOVE_FAV:
      /*return {
        ...state,
        myFavorites: state.myFavorites.filter(
          (fav) => fav.id !== Number(action.payload)
        ),
      };*/
      return { 
        ...state, 
        myFavorites: action.payload,
        allCharacters: action.payload
      };

    case FILTER:
      const allCharactersFiltered = state.allCharacters.filter(
        (char) => char.gender === action.payload
      );
      return {
        ...state,
        myFavorites:
          action.payload === "allCharacters"
            ? [...state.allCharacters]
            : allCharactersFiltered,
      };

    case ORDER:
      const allCharactersOrdered = [...state.allCharacters];
      return {
        ...state,
        myFavorites:
          action.payload === "A"
            ? allCharactersOrdered.sort((a, b) => a.id - b.id)
            : allCharactersOrdered.sort((a, b) => b.id - a.id),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
