export const initialBlankState = {
  auth: {
    currentUser: undefined
  },
  myProfile: {
    basicInfo: undefined,
    votedPolls: {},
  },
  polls: {},
  toast: {
    newToast: {
      key: 0
    }
  },
  homePage: {
    trendingPolls: [],
    popularPolls: [],
    recentPolls: []
  }
};

let initialState = initialBlankState;

export const setInitialState = (state) => {
  initialState = state;
};

export default initialState;