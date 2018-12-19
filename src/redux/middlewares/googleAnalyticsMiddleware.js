import trackEvent from '../../utils/trackEvent'

const middleware = store => next => action => {
  // let result = next(action);
  // const state = store.getState();

  // switch (action.type) {
  //   case ACTION:
  //     trackEvent("Category", "Action", action.label);
  //     break;
  //   case ACTION:
  //     trackEvent("Category", "Action", `${state.ads.state}`);
  //     break;
  //   case ACTION:
  //     trackEvent("Category", "Action", action.label);
  //     break;
  //   default:
  // }
  return
}

export default middleware
