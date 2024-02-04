import React,{useState,useEffect} from 'react'

const DataComponent = ({ searchTerm }) => {
    const [data, setData] = useState([]);
    const [showDiscount,setShowDiscount] =  useState(false);
    const [discount,setDiscount] =  useState(0);
    // const [quantity,setQuantity] = useState(0);
    // const [option,setOption] = useState("");
    const handleDiscount = event => {
        setShowDiscount(true)
      }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = require("../../itemslist.json")
        setData(response.items);
        console.log(response.items)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(searchTerm);
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredData)

  const calculatePricePerPiece = (item) => {
    return (item.mrp/item.companymargin).toFixed(4)
  }

  const calculatePricePerOuter = (item) => {
    return ((item.mrp * item.pieceinouter)/item.companymargin).toFixed(4)
  }

  const calculatePricePerCase = (item) => {
    return ((item.mrp * item.pieceinouter * item.outerincase)/item.companymargin).toFixed(4)
  }

  const calculatePricePerPieceAfterDiscount = (item) => {
    return ((calculatePricePerPiece(item) - ((discount/100)*calculatePricePerPiece(item)))).toFixed(4)
  }

  const calculatePricePerOuterAfterDiscount = (item) => {
     return ((calculatePricePerOuter(item) - ((discount/100)*calculatePricePerOuter(item)))).toFixed(4)
  }

  const calculatePricePerCaseAfterDiscount = (item) => {
    return ((calculatePricePerCase(item) - ((discount/100)*calculatePricePerCase(item)))).toFixed(2)
  }

  const handleEnterKey = (e) => {
    if(e.key === "Enter" && searchTerm.trim()!==""){
        handleDiscount();
    }
  }
  if(filteredData.length === 0) {
     return <p>Data not found!!!<br/> Please provide valid value</p>
  }

  // const handleQuantityChange = (itemId, newValue) => {
  //   setQuantity((prevQuantities) => ({
  //     ...prevQuantities,
  //     [itemId]: newValue,
  //   }));
  // };

  // const handleOptionChange = (itemId, newValue) => {
  //   setOption((prevOption) => ({
  //     ...prevOption,
  //     [itemId]: newValue,
  //   }));
  // };

  // const handleAddToList = (value,value1,value2) => {
  //    console.log(value,value1,value2)
  // }
  return (
    <div>
      <h3>Details of Item before discount:</h3>
      <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>MRP</th>
          <th>Price/Piece</th>
          <th>Price/Outer</th>
          <th>Price/Case</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.mrp}</td>
            <td>{calculatePricePerPiece(item)}</td>
            <td>{calculatePricePerOuter(item)}</td>
            <td>{calculatePricePerCase(item)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
      <br/>
      <h3>Details of Item after discount:</h3>
      <input
        type="number"
        placeholder='0'
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        onKeyUp={handleEnterKey}
      />
      <button onClick={handleDiscount}>Apply Discount</button>
      {showDiscount && 
      <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>MRP</th>
          <th>Price/Piece</th>
          <th>Price/Outer</th>
          <th>Price/Case</th>
          {/* <th>Quantity</th>
          <th>IN</th>
          <th>Add?</th> */}
        </tr>
      </thead>
      <tbody>
        {filteredData.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.mrp}</td>
            <td>{calculatePricePerPieceAfterDiscount(item)}</td>
            <td>{calculatePricePerOuterAfterDiscount(item)}</td>
            <td>{calculatePricePerCaseAfterDiscount(item)}</td>
            {/* <td>
            <input
           className='input_quantity'
           type="number"
           placeholder='0'
           value={quantity[item.id] || ''}
           onChange={(e) => handleQuantityChange(item.id, e.target.value)}
         />
         </td>
         <td>
         <label>
           <select className='custom_select' value={option[item.id] || ''} onChange={(e) => handleOptionChange(item.id, e.target.value)}>
             <option value="Box">Box</option>
             <option value="Outer">Outer</option>
             <option value="Piece">Piece</option>
           </select>
         </label>
         </td>
         <td>
         <button key={item.id} onClick={handleAddToList(item.id,quantity[item.id],option[item.id])}>Add to list</button>
         </td> */}
          </tr>
        ))}
      </tbody>
    </table>}
    </div>
  )
}

export default DataComponent