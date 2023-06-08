import { createSlice, current } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventoryData: [],
    stock: {
      stockRowId: "",
      stockName: "",
      stockValue: "",
      dialogBoxStatus: false,
    },
  },
  reducers: {
    importData: (state, action) => {
      state.inventoryData = action.payload;
    },
    filterData: (state, action) => {
      const filteredData = current(state.inventoryData).filter((currItem) => {
        console.log({ currItem });
        const itemPart = Object.values(currItem)[0];
        const itemAltPart = Object.values(currItem)[1];

        const regex = new RegExp(action.payload, "i");
        return regex.test(itemPart) || regex.test(itemAltPart);
      });

      state.inventoryData = filteredData;
    },
    deleteRow: (state, action) => {
      const filteredData = current(state.inventoryData).filter((currItem) => {
        return currItem.key !== action.payload;
      });
      state.inventoryData = filteredData;
    },
    setDialogBox: (state, action) => {
      const filteredData = current(state.inventoryData).filter((currItem) => {
        return currItem.key === action.payload.rowKey;
      });
      state.stock.stockRowId = action.payload.rowKey;
      state.stock.stockName = action.payload.stockName;
      state.stock.stockValue = action.payload.value;
      state.stock.dialogBoxStatus = true;
    },
    updateStock: (state, action) => {
      const afterUpdate = current(state.inventoryData).map((currItem) => {
        if (currItem.key === state.stock.stockRowId) {
          return { ...currItem, [state.stock.stockName]: action.payload };
        } else {
          return currItem;
        }
      });
      state.inventoryData = afterUpdate;
    },
    resetDialogBox: (state, action) => {
      state.stock.dialogBoxStatus = false;
    },
  },
});

export const {
  importData,
  filterData,
  deleteRow,
  setDialogBox,
  updateStock,
  resetDialogBox,
} = inventorySlice.actions;
export default inventorySlice.reducer;
