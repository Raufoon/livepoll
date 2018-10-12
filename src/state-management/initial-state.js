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
      show: false,
      message: 'Loading'
    }
  }
};

let initialState = initialBlankState;

if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
  initialState.loader.fullScreenLoader.show = true;
}

export default initialState