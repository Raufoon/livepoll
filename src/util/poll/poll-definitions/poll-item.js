import {ITEM_CONTENT_STRING} from "./poll-item-format";
import PollSettings from "./poll-settings";

export const createPollItem = (format, data, itemCreatorId) => {
  switch (format) {
    case PollSettings.POLL_ITEM_FORMAT.TEXT:
      break;
    default:
  }
  return {
    content: {},
    creatorId: itemCreatorId
    votes: []
  }
};