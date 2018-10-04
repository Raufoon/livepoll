import PollSettings from "./poll-definitions/poll-settings";

class Livepoll {
  constructor(settings) {
    this.settings = new PollSettings(settings);
  }
}

export const initRealtimeUpdate = (pollId) => {

};

export default Livepoll