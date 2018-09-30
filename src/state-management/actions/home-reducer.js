export const actionFetchHome = () => dispatch => {
  dispatch(actionFetchPopularPolls(0, 5));
  dispatch(actionFetchRecentPolls(0, 5));
  dispatch(actionFetchTrendingPolls(0, 5));
};

export const actionFetchRecentPolls = (start, limit) => dispatch => {

};

export const actionFetchPopularPolls = (start, limit) => dispatch => {

};

export const actionFetchTrendingPolls = (start, limit) => dispatch => {

};