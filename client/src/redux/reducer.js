import {
  GET_OPERATIONS,
  GET_CATEGORIES,
  FILTER_BY_CATEGORY,
} from "./constants";

let initialState = {
  allOperations: [],
  operations: [],
  categories: [],
  balance: "",
};

let operationsFiltered = [];

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OPERATIONS:
      function dateSorter(a, b) {
        if (a.date < b.date) return 1;
        else if (a.date > b.date) return -1;
        else return 0;
      }

      let sortOps = action.payload.results.sort(dateSorter);

      return {
        ...state,
        allOperations: sortOps,
        operations: sortOps,
        balance: action.payload.balance,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case FILTER_BY_CATEGORY:
      let ops = state.allOperations;

      if (action.payload === "All") {
        operationsFiltered = ops;
      } else {
        operationsFiltered = ops.filter((f) =>
          f.categories[0].name.includes(action.payload)
        );
      }

      return {
        ...state,
        operations: operationsFiltered,
      };

    default:
      return state;
  }
}
