import React from "react";

import PollSettings from "../../../util/poll/poll-definitions/poll-settings";
import TextItem from "./item-components/TextItem";

const LivepollItemList = props => {
  let ItemComponent;
  switch (props.itemFormat) {
    case PollSettings.POLL_ITEM_FORMAT.TEXT:
      ItemComponent = TextItem;
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      {
        Object.values(props.items || {})
          .map((item, index) =>
            <ItemComponent
              key={item.id}
              index={index + 1}
              item={item}
              vote={()=>{props.vote(item.id)}}/>)
      }
    </React.Fragment>
  )
};

export default LivepollItemList