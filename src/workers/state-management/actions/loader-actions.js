export const ACTION_SHOW_FULLSCR_LOADER = 'ACTION_SHOW_FULLSCR_LOADER';

export const actionShowFullscrLoader = (message) => ({
  type: ACTION_SHOW_FULLSCR_LOADER,
  message
});

export const ACTION_HIDE_FULLSCR_LOADER = 'ACTION_HIDE_FULLSCR_LOADER';

export const actionHideFullscrLoader = () => ({
  type: ACTION_HIDE_FULLSCR_LOADER
});