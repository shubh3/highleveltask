import { TextField, Button, Box, Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Setup.css";
export default function Setup() {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(false);
  const [balance, setBalance] = useState(0);
  const [customerDetail, setCustomerDetail] = useState();
  const [alert, setAlert] = useState(false);
  let walletId = window.localStorage.getItem("walletId");
  useEffect(() => {
    if (walletId) {
      axios
        .get(
          `https://assignment-production-0a62.up.railway.app/eBank/v1/wallet/${walletId}`
        )
        .then((response) => {
          console.log(response.data);
          setCustomerDetail(response.data);

          setLogged(true);
        });
    } else {
      setLogged(false);
    }
  }, [walletId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://assignment-production-0a62.up.railway.app/eBank/v1/setup",
        {
          balances: Number(parseFloat(balance).toFixed(4)),
          names: name,
        }
      );
      window.localStorage.setItem("walletId", response.data.wallet.walletId);
      window.localStorage.setItem("balance", response.data.wallet.balance);
      setAlert(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (logged) {
    return (
      <>
        <center>
          {alert ? (
            <Alert
              severity="success"
              onClose={() => {
                setAlert(false);
              }}
            >
              Account created successfully
            </Alert>
          ) : (
            <></>
          )}
          <h1>Welcome {customerDetail.name} </h1>
          <h3>Your balance is {customerDetail.balance}</h3>
        </center>
      </>
    );
  } else if (!walletId) {
    return (
      <center>
        <div id="setup">
          <h1>Setup your account</h1>
          <form onSubmit={handleSubmit}>
            <Box m={1} p={2}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box m={1} p={2}>
              <TextField
                label="Initial Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </center>
    );
  } else {
    return (
      <>
        <center>
          <h1>LOADING....</h1>
        </center>
      </>
    );
  }
}
