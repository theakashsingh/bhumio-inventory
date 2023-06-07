import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterData, importData } from "../redux/inventorySlice";
import { uuid_generator } from "../helperFunctions/uuidGenerator";

function AllInputFunction() {
  const [csvData, setCSVData] = useState([]);
  const [searchStr, setSearchStr] = useState("")
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

  //   convert file to readable formate
  const handleSelectFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let csvData = e.target.result;
      console.log({ csvData });
      let jsonData = parseCSVFile(csvData);
      const finalData = JSON.parse(jsonData)
      const addKeyInData = finalData.map((item)=>{
            return {
                ...item,
                key:uuid_generator()
            }
      })
      setCSVData(addKeyInData);
    };
    reader.readAsText(file);
  };

  const handleImportData = (e) => {
    e.preventDefault();
    dispatch(importData(csvData));
  };

  const handleSearchString = (e) =>{
      const strValue = e.target.value
      setSearchStr(strValue)
  }

  const handleFilterData = (e) =>{
     e.preventDefault()
     dispatch(filterData(searchStr))
  }

  return (
    <div className="App">
      
      <input type="file" name="" id="" onChange={handleSelectFile} />
      <button onClick={handleImportData}>import</button>
      <input type="search" name="" id="" onChange={handleSearchString}/>
      <button onClick={handleFilterData}>filter</button>
    </div>
  );
}

export default AllInputFunction;
