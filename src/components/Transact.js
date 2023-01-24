import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import axios from "axios";
import "../css/Transact.css";

export default function Transact() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [toggle, setToggle] = useState("DEBIT");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  let walletId = window.localStorage.getItem("walletId");
  let balance = window.localStorage.getItem("balance");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!(toggle === "DEBIT" && amount > balance)) {
        let actualAmount =
          toggle === "CREDIT" ? Number(amount) : Number(amount) * -1;
        console.log(actualAmount);

        const response = await axios.post(
          `https://assignment-production-0a62.up.railway.app/eBank/v1/transact/${walletId}`,
          {
            amount: Number(parseFloat(actualAmount).toFixed(4)),
            description: description,
          }
        );
        setAlert(true);
        console.log(response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle toggle button
  const handleToggle = (e) => {
    setToggle(e.target.value);
    console.log(e.target.value);
    console.log(toggle);
  };

  return (
    <center>
      {alert ? (
        <Alert
          severity="success"
          onClose={() => {
            setAlert(false);
          }}
        >
          Transaction was successfull
        </Alert>
      ) : (
        <></>
      )}
      {error ? (
        <Alert
          severity="error"
          onClose={() => {
            setError(false);
          }}
        >
          Insufficient Funds
        </Alert>
      ) : (
        <></>
      )}
      <h1>Transact</h1>
      <div id="transact">
        <form onSubmit={handleSubmit}>
          <Box m={0.5} p={2}>
            <TextField
              id="amount"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </Box>
          <Box m={0.5} p={2}>
            <TextField
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </Box>
          <Box m={0.5} p={2}>
            <br />
            <label>
              <input
                id="rad"
                type="radio"
                name="toggle"
                value="DEBIT"
                checked={toggle === "DEBIT"}
                onChange={handleToggle}
              />
              Debit
            </label>
            <label>
              <input
                id="rad"
                type="radio"
                name="toggle"
                value="CREDIT"
                checked={toggle === "CREDIT"}
                onChange={handleToggle}
              />
              Credit
            </label>
            <br />
          </Box>
          <Box m={0.5} p={2}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </center>
  );
}
