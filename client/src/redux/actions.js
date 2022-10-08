import axios from "axios";
import {
  GET_OPERATIONS,
} from "./constants";

export const getOperations = () => {
  return async (dispatch) => {
    try {
      let results = await axios.get("/operations");
      dispatch({ type: GET_OPERATIONS, payload: results.data });
    } catch (error) {
      console.error(error)
    }
  };
};

// export function filterByCategory(payload) {
//   return {
//     type: FILTER_BY_CATEGORY,
//     payload,
//   };
// }

