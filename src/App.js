import { useEffect, useState } from "react";
import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AllInputFunction from "./component/AllInputFunction";
import InventoryTable from "./component/InventoryTable";
import DialogBox from "./component/DialogBox";

function App() {
 
  return (
    <div className="app">
      <h1>Bhumio Inventory</h1>
      <AllInputFunction/>
      <DialogBox/>
      <InventoryTable/>
    </div>
  );
}

export default App;
