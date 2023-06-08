import "./DialogBox.css"
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetDialogBox, updateStock } from "../redux/inventorySlice";

const DialogBox = () => {
  const [stockInputValue, setStockInputValue] = useState("");

  const stockData = useSelector((state) => state.inventory.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    setStockInputValue(stockData.stockValue);
  }, [stockData.stockValue]);

  const handleStockInputValue = (e) => {
    const value = e.target.value;
    setStockInputValue(value);
  };
  const handleUpdateStock = (e) => {
    dispatch(updateStock(stockInputValue));
    dispatch(resetDialogBox())
  };
  const handleResetStock = () =>{
    dispatch(resetDialogBox())
  }
  const stockName = stockData.stockName === "LOCATION A STOCK" ? "A" : "B";
  return (
    <>
      {stockData.dialogBoxStatus && (
        <div className="outer_dialog_box">
          <div className="dialog_box">
          <h3>{`Update Location ${stockName} stock`}</h3>
          <TextField
            id="outlined-search"
            label={""}
            type="number"
            value={stockInputValue}
            onChange={handleStockInputValue}
          />
          <div className="dialog_box_handle_btn">
          <Button variant="outlined" onClick={handleResetStock}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateStock}>
            Update
          </Button>
          </div>
          
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBox;
