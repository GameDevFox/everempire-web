const promiseMiddleware = () => next => action => {
  if('then' in action && !('type' in action))
    action.then(next);
  else
    next(action);
};

export default promiseMiddleware;
