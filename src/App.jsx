// import { useState } from 'react'
import { Paper, Container } from "@mui/material";
import "./App.css";
import Buttons from "./Components/Buttons";
function App() {
  // const [count, setCount] = useState(0)
  return (
    <Container
    maxWidth={false}
      sx={{
        padding:'2rem',
        margin: "0",
        width: "100%",
        height: "100vh",
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        backgroundColor: "#FFF1D6",
      }}
    >
      {/* full calculator body */}
      <Paper
        elevation={5}
        sx={{
          backgroundColor: "white",
          height: "33rem",
          width: "24rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.5rem",
          borderRadius: "20px",
        }}
      >
        {/* display box */}
       
        {/* button grid */}
        <Buttons></Buttons>
      </Paper>
    </Container>
  );
}

export default App;
