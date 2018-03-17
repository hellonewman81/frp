import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import modal from './modules/modal';
import sitenav from './modules/sitenav';
import page from './modules/page';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    form,
    page,
    modal,
    sitenav,
    ...asyncReducers
  };
}
