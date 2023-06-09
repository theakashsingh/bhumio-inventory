import "./AllInputFunction.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterData, importData } from "../redux/inventorySlice";
import { uuid_generator } from "../helperFunctions/uuidGenerator";
import { Button, TextField } from "@mui/material";

function AllInputFunction() {
  const [csvData, setCSVData] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const dispatch = useDispatch();

  // convert csv file to json
  const parseCSVFile = (csv) => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result);
  };

  // give column name to remove that column from array of object
  function removeColumnFromArray(array, column) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].hasOwnProperty(column)) {
        delete array[i][column];
      }
    }
    return array;
  }


  //   convert file to readable formate
  const handleSelectFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let csvData = e.target.result;
      console.log({ csvData });
      let jsonData = parseCSVFile(csvData);
      const finalData = JSON.parse(jsonData);
      const addKeyInData = finalData.map((item) => {
        return {
          ...item,
          key: uuid_generator(),
        };
      });
      const afterRemovedEmptyObject = removeColumnFromArray(addKeyInData, "\r");
      console.log(afterRemovedEmptyObject.pop());
      setCSVData(afterRemovedEmptyObject);
    };
    reader.readAsText(file);
  };

  // dispatch csv data in redux 
  const handleImportData = (e) => {
    e.preventDefault();
    dispatch(importData(csvData));
  };

  // set search string in state
  const handleSearchString = (e) => {
    const strValue = e.target.value;
    setSearchStr(strValue);
  };

  // dispatch search string to redux
  const handleFilterData = (e) => {
    e.preventDefault();
    dispatch(filterData(searchStr));
  };

  return (
    <div className="input_functions_outer">
      <div className="import_csv_file">
        <TextField
          id="standard-search"
          label="CSV File"
          type="file"
          variant="standard"
          onChange={handleSelectFile}
        />

        <Button variant="contained" onClick={handleImportData}>
          Import
        </Button>
      </div>

      <div className="filter_data">
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          onChange={handleSearchString}
        />

        <Button variant="outlined" onClick={handleFilterData}>
          Filter
        </Button>
      </div>
    </div>
  );
}

export default AllInputFunction;
