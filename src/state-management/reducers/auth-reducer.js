import initialState from "../initial-state";

const authReducer = (state = initialState.auth, action) => {
  let newState;
  switch (action.type) {
    default:
      newState = state;
  }
  return newState;
};

export default authReducer