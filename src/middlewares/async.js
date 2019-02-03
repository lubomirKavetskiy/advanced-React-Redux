// it will execute during every action
// it's myAsyncMiddleware
export default ({ dispatch }) => next => action => {
  //debugger;
  // A)
  if (!action.payload || !action.payload.then) {
    // next - every time it's next middleware  const store = createStore(reducers, initialState, applyMiddleware(firstMiddleware, secondMiddleware, ..., lastMiddleware));
    // if we have several middlewares, this action will go to the next middleware;
    // and if we don't have another middleware or action will go through all middlewares (it will be the last middlaware) =>
    // => action will sent through the dispatch to all reducer (one by one, beginning from the first)
    // ***  only HERE action can be passed to reducer (to all reducers)
    return next(action);
  }

  // B)
  action.payload.then(function (response) {
    const newAction = Object.assign({}, action, { payload: response });

    // C)
    // it doesn't sent this action through the dispatch to the reducers
    // it will create new action and by this way will sent this action AGAIN to the FIRST middleware
    dispatch(newAction);
    // диспатч слідкує за появою екшина і пропускає екшин через міддилварку (першу, бо вона всеодно прожене цей екшин через наступну next) і всі редюсери
  });
}

// 1)
// DON'T call another action before it;
// click on button "Fetch Comments" => action fetchComments();
// this action through dispatch comes in the first middleware (myAsyncMiddleware, cause applyMiddleware(myAsyncMiddleware));
// A) is ignored !true || !true => false (action.payload.data = {Array(500)} and action.payload.then (receives Promise));
// works B) creates new action
// works C), calls new action, (this action comes through the dispatch AGAIN to the first middleware (by this way this action can go through all middlewares one by one);
// works A) !true || true => true (!action.payload.then (it's not already Promise))
// we don't have another middlewares, so this action comes through the dispatch to all reducers (one by one, works switch);

// 2)
// call another action before it
// click on button "Sign In" => action changeAuth();
// this action through dispatch comes in the first middleware (myAsyncMiddleware, cause applyMiddleware(myAsyncMiddleware));
// A) works false || true => true (!action.payload.then, isn't Promise);
// we don't have another middlewares, so this action comes through the dispatch to all reducers (one by one, works switch);

