import React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import VoteCountChip from "../utils/VoteCountChip/VoteCountChip";
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {FIRST_TROPHY_IMG_URL} from "../../constants/livepoll-constants";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  container: {
    backgroundColor: '#fbfbfb',
    margin: 10,
    boxShadow: 'none',
    border: '1px solid lightgray',
  },
  cardTitle: {
    textDecoration: 'none'
  },
  itemChip: {
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  itemText: {
    textTransform: 'none',
  },
  itemAvatar: {
    backgroundColor: '#f2f2f2'
  }
});

function TextPollCard(props) {
  const {classes} = props;
  return (
    <Card className={classes.container + ' ' + props.className}>
      <CardActionArea>
        <CardContent>
          <Typography
            className={classes.cardTitle}
            gutterBottom
            variant="h5"
            component={Link}
            to={`/poll/${props.poll.id}`}
          >
            {props.poll.settings.title}
          </Typography>

          {
            props.poll.items.map((item, itemIdx) => (
              <div key={item.id}>
                <Chip
                  className={props.classes.itemChip}
                  avatar={
                    itemIdx === 0 ? (
                      <Avatar src={FIRST_TROPHY_IMG_URL}>{itemIdx + 1}</Avatar>
                    ):(
                      <Avatar className={props.classes.itemAvatar}>{itemIdx + 1}</Avatar>
                    )
                  }
                  label={
                    <div>
                      <Button className={props.classes.itemText} size={'small'}>{item.content.text}</Button>
                      <VoteCountChip count={item.voteCount}/>
                    </div>
                  }
                />
              </div>
            ))
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

TextPollCard.propTypes = {
  poll: PropTypes.object.isRequired
};

export default withStyles(styles)(
  withRouter(
    TextPollCard
  )
)