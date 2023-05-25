import React, { useState } from "react";
import Papa from "papaparse";
import "./styles.css";
import { Upload, Button, Table, notification } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { dynamicURL } from "../Utils/urlConfig";

export default function BulkRegistration(props) {
  const [parsedData, setParsedData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("csvFile", file, file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(`${dynamicURL}/reservation/bulk/${props.userData.employerId}`, formData, config)
    .then((response) => {
      notification.success({
        message: "Success",
        description: "File uploaded successfully",
        style: {
          backgroundColor: "#f6ffed",
          borderColor: "#b7eb8f",
          color: "#389e0d",
        },
      });
    })
    .catch((error) => {
      notification.error({
        message: "Error",
        description: error.response.data,
        style: {
          backgroundColor: "#fff1f0",
          borderColor: "#ffa39e",
          color: "#cf1322",
        },
      });
    });

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const tableColumns = Object.keys(results.data[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));
        const tableData = results.data.map((row, index) => ({
          ...row,
          key: index,
        }));
        setParsedData(results.data);
        setTableColumns(tableColumns);
        setTableData(tableData);
        console.log(results);
      },
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setParsedData([]);
    setTableColumns([]);
    setTableData([]);
  };

  const props1 = {
    beforeUpload: (file) => {
      if (file.type !== "text/csv") {
        notification.error({
          message: "Invalid File Type",
          description: "You can only upload CSV files",
          style: {
            backgroundColor: "#fff1f0",
            borderColor: "#ffa39e",
            color: "#cf1322",
          },
        });
        return false;
      }
      setSelectedFile(file);
      handleUpload(file);
      return false;
    },
    showUploadList: false,
    accept: ".csv",
  };

  return (
    <div>
      {/* File Uploader */}
      <div>
        <h3 style={{ textAlign: "center" }}>
          Bulk <span style={{ color: "green" }}>Reservation </span> by uploading
          CSV file
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <form onSubmit={handleUpload}>
          {selectedFile ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <p>{selectedFile.name}</p>
              <Button
                className="remove-btn"
                style={{ marginLeft: 10, color: "red" }}
                icon={<DeleteOutlined />}
                onClick={handleRemoveFile}
              >
                Remove File
              </Button>
            </div>
          ) : (
            <Upload {...props1}>
              <Button icon={<UploadOutlined />}>Choose File</Button>
            </Upload>
          )}
        </form>
      </div>

      {/* Table */}
      {tableColumns.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Table
            className="displayData"
            dataSource={tableData}
            columns={tableColumns}
          />
        </div>
      )}
    </div>
  );
}
