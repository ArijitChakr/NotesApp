import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UI } from "./components/Ui";
function App() {
  return (
    <BrowserRouter>
      <div
        className="bg-dark d-flex justify-content-center text-light"
        style={{ height: "100vh" }}
      >
        <Container className="my-4">
          <UI />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
