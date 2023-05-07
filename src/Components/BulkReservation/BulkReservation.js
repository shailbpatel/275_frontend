import React, { useState } from "react";
import Papa from "papaparse";
import "./styles.css";

export default function BulkReservation() {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  if (selectedFile && parsedData[0] != undefined) {
    console.log(parsedData[0].Country);
  }

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setParsedData([]);
    setTableRows([]);
    setValues([]);

    // Reset file input element
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.value = "";
  };

  return (
    <div>
      {/* File Uploader */}
      <div>
        <h3 className="title">Bulk Reservation by uploading CSV file</h3>
      </div>
      <div className="btn choose_btn">
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
      </div>

      {selectedFile && (
        <button className="btn remove_btn" onClick={handleRemoveFile}>
          Remove File
        </button>
      )}

      {/* Table */}
      {parsedData.length > 0 && (
        <div className="displayData">
          <table>
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
