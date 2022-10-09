import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Operations from "./pages/Operations";
import OperationForm from "./pages/OperationForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/operations" component={Operations} />
        <Route exact path="/new" component={OperationForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
