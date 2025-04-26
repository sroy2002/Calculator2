import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import backSpace from "../assets/backspace-arrow.png";
const Buttons = () => {
  const [expression, setExpression] = useState("");
  const expressionRef = useRef("");
  const [result, setResult] = useState("0");
  const btns = [
    "AC",
    "BACK",
    "1/x",
    "/",
    "*",
    "7",
    "8",
    "9",
    "-",
    "+",
    "4",
    "5",
    "6",
    "%",
    "√x",
    "1",
    "2",
    "3",
    "0",
    ".",
    "+/-",
    "π",
    "x²",
    "=",
  ];
  const colors = (btn) => {
    if (btn === "=") {
      return "#ff9800";
    } else if (btn >= "0" && btn <= "9") {
      return "#d9d9d9";
    } else if (btn === "AC" || btn === "BACK") {
      return "#d9d9d9";
    } else if (
      btn === "1/x" ||
      btn === "√x" ||
      btn === "x²" ||
      btn === "π" ||
      btn === "+/-" ||
      btn === "." ||
      btn === "%" ||
      btn === "+" ||
      btn === "-" ||
      btn === "*" ||
      btn === "/"
    ) {
      return "#8383ff";
    }
  };
 
  const handleBtn = useCallback((btn) => {
    switch (btn) {
      case "AC":
        setExpression("");
        setResult("0");
        break;
      case "BACK":
        setExpression((prev) => prev.slice(0, -1));
        break;
      case "+":
        setExpression((prev) => prev + " + ");
        break;
      case "-":
        setExpression((prev) => prev + " - ");
        break;
      case "*":
        setExpression((prev) => prev + " * ");
        break;
      case "/":
        setExpression((prev) => prev + " / ");
        break;
      case "1/x":
        setExpression((prev) => "1 / " + prev);
        break;
      case "x²":
        setExpression((prev) => prev + " * " + prev);
        break;
      case "√x":
        setExpression((prev) => "√" + prev);
        break;
      case "π":
        setExpression((prev) => prev + "3.14159265359");
        break;
      case ".":
        if (expression.length === 0) {
          setExpression("0.");
        } else {
          setExpression((prev) => prev + ".");
        }
        break;
      case "+/-":
        if (expression.length === 0) {
          setExpression("-1");
        } else if (expression[0] === "-") {
          setExpression((prev) => prev.slice(1));
        } else if (expression[0] !== "-") {
          setExpression((prev) => "- " + prev);
        }
        break;
      case "=":
        { const currentExpression = expressionRef.current;
        if (!currentExpression || currentExpression.trim() === "") {
          setResult("0");
          return;
        }   
        if (currentExpression.includes("%")) {
          const modifiedExpression = currentExpression.replace(
            /(\d+)%/g,
            "($1 / 100)"
          );
          const res = eval(modifiedExpression);
          setResult(res.toString());
          return;
        }
        if (currentExpression.includes("√")) {
          const num = currentExpression.split("√")[1];
          const res = Math.sqrt(num);
          setResult(res.toString());
          return;
        }
        try {
          const res = eval(currentExpression);
          setResult(res.toString());
        } catch (err) {
          console.log(err);
        }

        break; }
      default:
        setExpression((prev) => prev + btn);
        break;
    }
  }, [expression]);

  useEffect(() => {
    expressionRef.current = expression;
    const handleKeyDown = (event) => {
      const key = event.key;
      const keyMap = {
        Enter: "=",
        Backspace: "BACK",
      };

      const mappedKey = keyMap[key] || key;
     
      if (btns.includes(mappedKey)) {
        handleBtn(mappedKey);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [btns,expression]);
  return (
    <div style={{ height: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#c8c8c8",
          width: "100%",
          height: "8rem",
          borderRadius: "20px",
          boxShadow: "inset -5px 6px 31px 0px rgba(0, 0, 0, 0.09)",
        }}
      >
        <Typography
          sx={{
            paddingRight: "2rem",
            paddingTop: "1.5rem",
            height: "2rem",
            textAlign: "right",
            color: "white",
            fontSize: "1.5rem",
          }}
        >
          {" "}
          {expression}
        </Typography>
        <Typography
          sx={{
            paddingRight: "2rem",
            paddingBottom: "1.7rem",
            height: "2rem",
            textAlign: "right",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {" "}
          {result}
        </Typography>
      </Box>

      <Grid
        container
        rowSpacing={1.5}
        columnSpacing={1.5}
        sx={{ marginTop: "20px", justifyContent: "center" }}
      >
        {btns.map((btn, index) => (
          <Grid item xs={5} sm={5} md={5} lg={5} key={index}>
            <Button
              variant="contained"
              sx={{
                width: btn === "=" ? "9rem" : "4rem",
                height: "4rem",
                borderRadius: btn === "=" ? "1rem" : "5rem",
                backgroundColor: colors(btn),
                color: "black",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
              onClick={() => handleBtn(btn)}
            >
              {btn === "BACK" ? <img src={backSpace} alt="backspace icon" style={{height:"1.1rem"}}/>:btn}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Buttons;
