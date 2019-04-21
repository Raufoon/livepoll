const loggerMiddleware = store => next => action => {
  console.log('MAIN: ACTION DISPATCHED!!!');
  console.log(action);
  let result = next(action);
  console.log('MAIN: NEXT STATE:');
  console.log(store.getState());
  return result
};

export default loggerMiddleware;