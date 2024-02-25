import React, { useState } from 'react';
import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

const ExcelCreation = ({ data,amount }) => {
  const [name,setName] = useState("");
  const handleDownload = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Provide headers manually
    // const headers = ['Sr.','Product','ICODE','Batch','MRP','Cs','Out','Unts','Qty','Amt','Kg.','Schm','Schm%','StarDisc.','CasePack','OutPack'];
    const headers = ['Name','Quantity','Amount'];

    // Create a worksheet and add headers
    const headerRow = [headers];
    const worksheet = XLSX.utils.aoa_to_sheet([[`${name}`]]);
    const mergeCell = { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } };
    worksheet['!merges'] = [mergeCell];
    const style = { alignment: { horizontal: 'center', vertical: 'center' } };
    worksheet['A1'].s = style;
    XLSX.utils.sheet_add_aoa(worksheet,headerRow , { origin: -1});

    // Convert your data to an array of arrays
    // const dataArray = data.map((item,index) => [index+1,item.name,1,1,item.mrp,1,1,1,item.quantity, item.amount,1,1,1,1,1,1]);
    const dataArray = data.map(item => [item.name,item.quantity,item.amount]);

    // Add data rows to the worksheet
    XLSX.utils.sheet_add_aoa(worksheet, dataArray, { origin: 'A3' });

    const totalRow = ['Total Amount', '', amount];
  XLSX.utils.sheet_add_aoa(worksheet, [totalRow], { origin: -1 });
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
      <input type="text" placeholder='Name' value={name} onChange={(e) => handleNameChange(e.target.value)}/>
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default ExcelCreation;
