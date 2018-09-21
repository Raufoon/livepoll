import PollSettings from "./poll-definitions/poll-settings";
import {VOTE_TYPES} from "./vote-definitions/vote-types";
import {POLL_ITEM_FORMAT_BASIC} from "./poll-definitions/poll-item-format";

class Livepoll {
  constructor(settings, itemFormat, voteType) {
    this.items = [];
    this.itemFormat = itemFormat || POLL_ITEM_FORMAT_BASIC;
    this.settings = new PollSettings(...settings);
    this.voteType = voteType || VOTE_TYPES.TICK_VOTE
  }
}

export default Livepoll