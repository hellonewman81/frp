const LOAD = 'sbx/modal/LOAD';
const LOAD_SUCCESS = 'sbx/modal/LOAD_SUCCESS';
const LOAD_FAIL = 'sbx/modal/LOAD_FAIL';
const TOGGLE_VISABILITY = 'sbx/modal/TOGGLE_VISABILITY';

const initialState = {
  loaded: false,
  isOpen: false
};

export default function modal(state = initialState, action = {}) {
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
  return globalState.modal && globalState.modal.loaded;
}

export function load(path) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.post('/loadModal', { id: path })
  };
}

export function toggleModal() {
  return { type: TOGGLE_VISABILITY };
}
