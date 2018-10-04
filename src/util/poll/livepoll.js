import PollSettings from "./poll-definitions/poll-settings";

class Livepoll {
  constructor(settings) {
    this.settings = new PollSettings(settings);
  }
}

export default Livepoll