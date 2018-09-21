import {ITEM_CONTENT_STRING} from "./poll-item-format";

export const createPollItem = (format, data) => {
  let contents = [];

  for (let key in format) {
    if (format.hasOwnProperty(key)) {
      switch (key) {
        case ITEM_CONTENT_STRING:
          contents.push(data[key].toString());
          break;
      }
    }
  }
  return {
    contents,
    votes: []
  }
};