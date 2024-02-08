import React,{useState,useEffect} from 'react'

function DiscountComponent(props) {
    const [data, setData] = useState([]);
    const [pricegiven,setPriceGiven] = useState(0);
    const [discount,setDiscount] = useState(0);
    console.log(props.searchTerm);
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

      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(props.searchTerm.toLowerCase())
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

      const handlePriceGiven = (itemId,price,pricepercase) =>{
          setPriceGiven((prevPrice) => ({
            ...prevPrice,
            [itemId]: price,
          }));
          const newData = filteredData.filter(item => item.id === itemId);
          console.log(newData);
          setDiscount((((pricepercase - price)/pricepercase) * 100).toFixed(2))
        };
      
  return (
    <div className='container-discount'>
     <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Price/Piece</th>
          <th>Price/Outer</th>
          <th>Price/Case</th>
        </tr>
      </thead>
      <tbody>
      {filteredData.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
            <div>
                <span>{calculatePricePerPiece(item)}</span>
                <input type="number" className='inputClass' min={0}/>
            </div>
                </td>
            <td>
            <div>
                <span>{calculatePricePerOuter(item)}</span>
                <input type="number" className='inputClass' min={0}/>
            </div>
            </td>
            <td>
            <div>
                <span>{calculatePricePerCase(item)}</span>
                <input type="number" className='inputClass' min={0} value={pricegiven[item.id] || ''}
              onChange={(e) => handlePriceGiven(item.id, e.target.value,calculatePricePerCase(item))}/>
            </div>
            </td>
            </tr>
            ))}
      </tbody>
      </table>
      <div className='displayClass'>
        <h3 className='headingdiscount'>Discount</h3>
        <div className='displayDiscount'>{discount}%</div>
      </div>
      
    </div>
  )
}

export default DiscountComponent