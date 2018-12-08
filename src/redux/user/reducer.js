
// Set initial state
const initialState = {
  registerData: {},
  userData: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'registerData': {
      if (action.data) {
        const input = action.data;
        return {
          ...state,
          registerData: input
        };
      }
    }

    case 'userData': {
      if (action.data) {
        const input = action.data;
        return {
          ...state,
          userData: input
        };
      }
    }

    default:
      return state;
  }
}
