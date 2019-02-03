import tv4 from 'tv4';
import stateScheme from 'middlewares/stateSchema';

export default ({ dispatch, getState }) => next => action => {
  next(action);

  !tv4.validate(getState(), stateScheme) && console.warn('Invalid state schema detected');
}
