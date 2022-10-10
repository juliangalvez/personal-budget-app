import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Operations from "./pages/Operations";
import OperationForm from "./pages/OperationForm";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import styled from "styled-components";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/operations" component={Operations} />
            <Route exact path="/new" component={OperationForm} />
          </Container>
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

const Container = styled.div`
  @media (min-width: 600px) {
    margin: auto;
    width: 600px;
  }
  @media (max-width: 400px) {
    margin: auto;
    width: 380px;
  }
`;
