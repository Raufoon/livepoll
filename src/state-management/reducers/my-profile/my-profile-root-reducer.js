import initialState from "../../initial-state";
import {
  ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS
} from "../../actions/my-profile-actions";

const myProfileRootReducer = (state = initialState.myProfile, action) => {
  switch (action.type) {
    case ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS:
      return {...state, basicInfo: {...state.basicInfo, ...action.basicInfo}};

    default:
      return state;
  }
};

export default myProfileRootReducer