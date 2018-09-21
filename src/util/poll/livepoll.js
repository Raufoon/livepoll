import PollSettings from "./poll-definitions/poll-settings";
import {VOTE_TYPES} from "./vote-definitions/vote-types";

class Livepoll {
  constructor(settings, itemFormat, voteType) {
    this.items = [];
    this.settings = new PollSettings(...settings);
    this.voteType = voteType || VOTE_TYPES.TICK_VOTE
  }
}

export default Livepoll