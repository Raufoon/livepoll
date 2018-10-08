import initialState from "../initial-state";
import {ACTION_MAKE_TOAST} from "../actions/toast-actions";

const toastReducer = (state = initialState.toast, action) => {
  switch (action.type) {
    case ACTION_MAKE_TOAST:
      return {
        ...state,
        newToast: action.newToast
      };

    default:
      return state;
  }
};

export default toastReducer;