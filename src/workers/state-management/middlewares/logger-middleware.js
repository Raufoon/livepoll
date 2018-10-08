const loggerMiddleware = store => next => action => {
  console.log('WORKER: ACTION DISPATCHED!!!');
  console.log(action);
  let result = next(action);
  console.log('WORKER: NEXT STATE:');
  console.log(store.getState());
  return result
};

export default loggerMiddleware;