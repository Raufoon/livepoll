import initialState from "../initial-state";
import {ACTION_MAKE_TOAST} from "../actions/toast-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const toastReducer = (state = initialState.toast, action) => {
  switch (action.type) {
    case ACTION_MAKE_TOAST:
      return {
        ...state,
        newToast: action.newToast
      };

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.toast? action.newState.toast: state;

    default:
      return state;
  }
};

export default toastReducer;