import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRow, setDialogBox } from "../redux/inventorySlice";

const InventoryTable = () => {
  const inventoryData = useSelector((state) => state.inventory.inventoryData);

  const dispatch = useDispatch();
  console.log("FROM_INVENTORY_TABLE", inventoryData);

  const handleDeleteRow = (key) => {
    console.log({ key });
    dispatch(deleteRow(key));
  };

  const handleDialogBox = (rowKey, stockName, value)=>{
        dispatch(setDialogBox({rowKey, stockName, value}))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Part</TableCell>
            <TableCell>Alt_Part</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Modal</TableCell>
            <TableCell>Engine</TableCell>
            <TableCell>Car</TableCell>
            <TableCell>LocA</TableCell>
            <TableCell>LocA_Stock</TableCell>
            <TableCell>LocB</TableCell>
            <TableCell>LocB_Stock</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Delete Row</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(inventoryData).map((row) => {
            return (
              <TableRow key={row.key}>
                {Object.keys(row).map((value, id) => {

                  switch (value) {
                    case "key":
                      return (
                        <TableCell key={`${row.key}${id}`}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handleDeleteRow(row[value]);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      );

                    case "LOCATION A STOCK":
                      return (
                        <TableCell style={{cursor:"pointer"}} key={`${row.key}${id}`} onClick={()=> handleDialogBox(row.key, value, row[value])}>
                          {row[value]}
                        </TableCell>
                      );

                      case "LOC B STOCK ":
                      return (
                        <TableCell style={{cursor:"pointer"}} key={`${row.key}${id}`} onClick={()=> handleDialogBox(row.key, value, row[value])}>
                          {row[value]}
                        </TableCell>
                      );

                    default:
                      return (
                        <TableCell key={`${row.key}${id}`}>
                          {row[value]}
                        </TableCell>
                      );
                  }

                  // if (value === "key") {
                  //   return (
                  //     <TableCell key={`${row.key}${id}`}>
                  //       <Button
                  //         variant="contained"
                  //         onClick={() => {
                  //           handleDeleteRow(row[value]);
                  //         }}
                  //       >
                  //         Delete
                  //       </Button>
                  //     </TableCell>
                  //   );
                  // } else {
                  //   return (
                  //     <TableCell key={`${row.key}${id}`}>
                  //       {row[value]}
                  //     </TableCell>
                  //   );
                  // }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
