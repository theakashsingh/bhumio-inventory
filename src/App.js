import { useEffect, useState } from "react";
import "./App.css";
import AllInputFunction from "./component/AllInputFunction";
import InventoryTable from "./component/InventoryTable";

function App() {
 
  return (
    <div className="App">
      <AllInputFunction/>
      <InventoryTable/>
    </div>
  );
}

export default App;
