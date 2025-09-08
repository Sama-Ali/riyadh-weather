import "./App.css";
import "./style.css";
import Container from "@mui/material/Container";
import TheCard from "./TheCard.js";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <TheCard />
      </Container>
    </div>
  );
}

export default App;
