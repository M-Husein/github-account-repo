import { DARK_MODE } from "../types";

// initial state
const initialState = {
  // checking mode from localstorage if falsey (e.g. 0, null, undefined, etc.) it will be false, otherwise true
  isDarkMode: !!JSON.parse(typeof window !== 'undefined' ? localStorage.getItem("darkmode") as any : '0'),
};

const darkModeReducer = (state = initialState, action: any) => {
  switch (action.type){
    case DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload, // getting value from the action file and changing isDarkMode State.
      };
    default:
      return state;
  }
};

export default darkModeReducer;
