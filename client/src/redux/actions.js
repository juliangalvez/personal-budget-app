import axios from "axios";
import { GET_OPERATIONS } from "./constants";

export const getOperations = () => {
  return async (dispatch) => {
    try {
      let results = await axios.get("http://localhost:3001/operations");
      dispatch({ type: GET_OPERATIONS, payload: results.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postOperation = (payload) => {
  return async () => {
    try {
      await axios.post("http://localhost:3001/operations/add", payload);
    } catch (error) {
      console.error(error);
    }
  };
};
export const editOperation = (payload) => {
  return async () => {
    try {
      await axios.patch("http://localhost:3001/operations/edit", payload);
    } catch (error) {
      console.error(error);
    }
  };
};
export const delOperation = (payload) => {
  return async () => {
    try {
      console.log(payload)
      await axios.delete("http://localhost:3001/operations/delete", { data: payload });
    } catch (error) {
      console.error(error);
    }
  };
};

// export function filterByCategory(payload) {
//   return {
//     type: FILTER_BY_CATEGORY,
//     payload,
//   };
// }
