const LOAD = 'sbx/sitenav/LOAD';
const LOAD_SUCCESS = 'sbx/sitenav/LOAD_SUCCESS';
const LOAD_FAIL = 'sbx/sitenav/LOAD_FAIL';
const TOGGLE_VISABILITY = 'sbx/sitenav/TOGGLE_VISABILITY';

const initialState = {
  loaded: false,
  isOpen: false
};

export default function sitenav(state = initialState, action = {}) {
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
    case TOGGLE_VISABILITY:
      return {
        ...state,
        loading: true,
        loaded: true,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.sitenav && globalState.sitenav.loaded;
}

export function load(path) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.post('/loadSitenav', { id: path })
  };
}

export function toggleSiteNav() {
  return { type: TOGGLE_VISABILITY };
}
