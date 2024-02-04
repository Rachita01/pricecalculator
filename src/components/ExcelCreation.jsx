import React, { useState } from 'react';
import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

const ExcelCreation = ({ data }) => {
  const [name,setName] = useState("");
  const handleDownload = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Provide headers manually
    const headers = ['Name', 'Quantity', 'Amount'];

    // Create a worksheet and add headers
    const headerRow = [headers];
    const worksheet = XLSX.utils.aoa_to_sheet(headerRow);

    // Convert your data to an array of arrays
    const dataArray = data.map(item => [item.name, item.quantity, item.amount]);

    // Add data rows to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, dataArray, { origin: 'A2' });

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

     // Save the workbook as a blob
     XLSX.writeFile(workbook, `${name}.xlsx`, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  };

  const handleNameChange = (value) => {
    setName(value);
  }
  return (
    <div>
      <input type="text" placeholder='name' value={name} onChange={(e) => handleNameChange(e.target.value)}/>
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default ExcelCreation;
