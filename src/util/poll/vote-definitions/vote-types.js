export const VOTE_TYPES = {
  TICK_VOTE: 't',
  NUMBER_VOTE_0_10: 'n10',
  NUMBER_VOTE_0_100: 'n100',
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