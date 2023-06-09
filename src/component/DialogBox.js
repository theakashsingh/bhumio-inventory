import "./DialogBox.css";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetDialogBox, updateStock } from "../redux/inventorySlice";

const DialogBox = () => {
  const dialogRef = useRef();
  const [stockInputValue, setStockInputValue] = useState("");

  const stockData = useSelector((state) => state.inventory.stock);
  const dispatch = useDispatch();

  useEffect(() => {
    setStockInputValue(stockData.stockValue);
  }, [stockData.stockValue]);

  // click out side close and reset dialog box
  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      dispatch(resetDialogBox());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // set dialog input value in state
  const handleStockInputValue = (e) => {
    const value = e.target.value;
    setStockInputValue(value);
  };


  // after change value dispatch value
  const handleUpdateStock = (e) => {
    dispatch(updateStock(stockInputValue));
    dispatch(resetDialogBox());
  };

  // reset and close dialog box
  const handleResetStock = () => {
    dispatch(resetDialogBox());
  };
  const stockName = stockData.stockName === "LOCATION A STOCK" ? "A" : "B";
  return (
    <>
      {stockData.dialogBoxStatus && (
        <div className="outer_dialog_box">
          <div className="dialog_box" ref={dialogRef}>
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
