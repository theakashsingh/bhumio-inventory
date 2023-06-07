import { createSlice, current } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventoryData: [],
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
  },
});

export const { importData, filterData } = inventorySlice.actions;
export default inventorySlice.reducer;
