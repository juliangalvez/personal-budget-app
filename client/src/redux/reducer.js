import { GET_OPERATIONS } from "./constants";

let initialState = {
  allOperations: [],
  operations: [],
  balance: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OPERATIONS:
      function dateSorter(a, b) {
        if (a.date < b.date) return 1;
        else if (a.date > b.date) return -1;
        else return 0;
      }

      let sortOps = action.payload.results.sort(dateSorter);
      let homeOps = sortOps.slice(0, 10);

      return {
        ...state,
        allOperations: sortOps,
        operations: homeOps,
        balance: action.payload.balance
      };

    default:
      return state;
  }
}
