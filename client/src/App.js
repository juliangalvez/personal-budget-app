import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Operations from "./components/Operations";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Route exact path="/operations" component={Operations} />
      </div>
    </BrowserRouter>
  );
}

export default App;
