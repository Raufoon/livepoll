import initialState from "../initial-state";
import {ACTION_MAKE_TOAST} from "../actions/toast-actions";

const toastReducer = (state = initialState.toast, action) => {
  let newState;
  switch (action.type) {
    case ACTION_MAKE_TOAST:
      newState = {
        ...state,
        newToast: action.newToast
      };
      postMessage({
        toast: newState
      });
      return newState;

    default:
      return state;
  }
};

export default toastReducer;