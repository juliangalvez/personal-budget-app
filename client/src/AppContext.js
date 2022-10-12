import { createContext } from "react";
import { useSelector } from "react-redux";

const AppContext = createContext();

export function AppProvider({ children }) {
  let allOperations = useSelector((state) => state.allOperations);
  let operations = useSelector((state) => state.operations);
  let balance = useSelector((state) => state.balance);
  let categories = useSelector((state) => state.categories);

  return (
    <AppContext.Provider
      value={{ allOperations, operations, categories, balance }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
