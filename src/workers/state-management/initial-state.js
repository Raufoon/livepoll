export const initialBlankState = {
  auth: {
    currentUser: undefined
  },
  myProfile: {
    basicInfo: undefined,
    votedPolls: {},
    myPolls: []
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
      message: 'Loading'
    }
  }
};

let initialState = initialBlankState;

export default initialState;