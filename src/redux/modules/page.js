const LOAD = 'sbx/page/LOAD';
const LOAD_SUCCESS = 'sbx/page/LOAD_SUCCESS';
const LOAD_FAIL = 'sbx/page/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function page(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.product && globalState.product.loaded;
}

export function load(location) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.post('/loadPage', location)
  };
}

export function loadServices(location) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.post('/page/services', location)
  };
}
