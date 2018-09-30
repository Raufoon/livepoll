const initialState = {
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

export default initialState