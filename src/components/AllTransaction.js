import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/allTransaction.css";

export default function ExportDefaultToolbar() {
  const [result, setResult] = useState();
  //const [loading,setLoading] = useState(false);
  let columns = [
    {
      field: "transactionID",
      headerName: "Transaction ID",
    },
    {
      field: "amount",
      headerName: "Amount",
    },
    {
      field: "balance",
      headerName: "Balance",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "type",
      headerName: "Transaction Type",
    },
  ];

  let walletId = window.localStorage.getItem("walletId");
  useEffect(() => {
    if (walletId) {
      axios
        .get(
          `https://assignment-production-0a62.up.railway.app/eBank/v1/transactions?walletId=${walletId}&skip=0&limit=10`
        )
        .then((response) => {
          setResult(response.data);
        });
    }
  }, [walletId]);

  return (
    <div>
      {result ? (
        <div id="table" style={{ height: 400, width: "50%" }}>
          <DataGrid
            rows={result}
            columns={columns}
            getRowId={(row) => row._id}
            //loading={loading}
            components={{ Toolbar: GridToolbar }}
          />{" "}
        </div>
      ) : (
        <center>
          <h1>Please login to see you transaction</h1>
        </center>
      )}
    </div>
  );
}
