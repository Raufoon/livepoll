export const VOTE_TYPES = {
  TICK_VOTE: 'TICK_VOTE',
};

export const createVote = (type, voterId, value) => {
  switch (type) {
    case VOTE_TYPES.TICK_VOTE:
      return {
        voterId,
        value: !!value
      };

    default:
      break;
  }
};