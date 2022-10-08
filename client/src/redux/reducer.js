import { GET_OPERATIONS } from "./constants";

let initialState = {
  allOperations: [],
  operations: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OPERATIONS:
      return {
        ...state,
        allOperations: action.payload,
        operations: action.payload,
      };

      
    default:
      return state;
  }
}
