export let initialBlankState = {
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
  },
  loader: {
    fullScreenLoader: {
      show: true,
      message: 'loading'
    }
  }
};

let stateFromStorage = {};
stateFromStorage = JSON.parse(localStorage.getItem('app-state') || '{}');
delete stateFromStorage.auth;
let initialState = {...initialBlankState,  ...stateFromStorage};
export default initialState