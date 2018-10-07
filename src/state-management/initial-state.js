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
  }
};

let stateFromStorage = JSON.parse(localStorage.getItem('app-state') || '{}');
let initialState = {...initialBlankState,  ...stateFromStorage};
export default initialState