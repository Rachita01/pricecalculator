import React,{useState,useEffect} from 'react'

const DataComponent = ({ searchTerm }) => {
    const [data, setData] = useState([]);
    const [showDiscount,setShowDiscount] =  useState(false);
    const [discount,setDiscount] =  useState(0);
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
    return (item.mrp/item.companymargin).toFixed(2)
  }

  const calculatePricePerOuter = (item) => {
    return ((item.mrp * item.pieceinouter)/item.companymargin).toFixed(2)
  }

  const calculatePricePerCase = (item) => {
    return ((item.mrp * item.pieceinouter * item.outerincase)/item.companymargin).toFixed(2)
  }

  const calculatePricePerPieceAfterDiscount = (item) => {
    return ((calculatePricePerPiece(item) - ((discount/100)*calculatePricePerPiece(item)))).toFixed(2)
  }

  const calculatePricePerOuterAfterDiscount = (item) => {
     return ((calculatePricePerOuter(item) - ((discount/100)*calculatePricePerOuter(item)))).toFixed(2)
  }

  const calculatePricePerCaseAfterDiscount = (item) => {
    return ((calculatePricePerCase(item) - ((discount/100)*calculatePricePerCase(item)))).toFixed(2)
  }

  if(filteredData.length === 0) {
     return <p>Data not found!!!<br/> Please provide valid value</p>
  }
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
          </tr>
        ))}
      </tbody>
    </table>}
    </div>
  )
}

export default DataComponent