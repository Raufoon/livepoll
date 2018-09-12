const loggerMiddleware = store => next => action => {
  console.log('ACTION DISPATCHED!!!');
  console.log(action);
  let result = next(action);
  console.log('NEXT STATE:');
  console.log(store.getState());
  return result
};

export default loggerMiddleware;