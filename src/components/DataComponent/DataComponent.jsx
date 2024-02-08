import React,{useState,useEffect} from 'react'
import ExcelCreation from '../ExcelCreation/ExcelCreation';

const DataComponent = ({ searchTerm }) => {
    const [data, setData] = useState([]);
    const [discount,setDiscount] =  useState(0);
    const [quantity,setQuantity] = useState(0);
    const [option,setOption] = useState("");
    const [amount,setAmount] = useState(0);
    const [list,setList] = useState(()=> {
      const storedList = localStorage.getItem('list');
      return storedList ? JSON.parse(storedList) : [];
    });
    const [createList,setCreateList] = useState(false);
      useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
        setAmount((list.map(item => Number(item.amount)).reduce((acc,cum) => acc+cum,0)).toFixed(2))
        console.log(amount);
        console.log(list)
      }, [list,amount]);

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

  useEffect(() => {console.log(list)},[list]);
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

  const calculatePricePerPieceAfterDiscount = (item,discount) => {
    if(discount === undefined || discount===0){
      return calculatePricePerPiece(item);
    }
    else{
    return ((calculatePricePerPiece(item) - ((discount/100)*calculatePricePerPiece(item)))).toFixed(4)
    }
  }

  const calculatePricePerOuterAfterDiscount = (item,discount) => {
    if(discount === undefined || discount===0){
      return calculatePricePerOuter(item);
    }
    else{
     return ((calculatePricePerOuter(item) - ((discount/100)*calculatePricePerOuter(item)))).toFixed(4)
    }
  }

  const calculatePricePerCaseAfterDiscount = (item,discount) => {
    if(discount === undefined || discount===0){
      return calculatePricePerCase(item);
    }
    else{
    return ((calculatePricePerCase(item) - ((discount/100)*calculatePricePerCase(item)))).toFixed(2)
    }
  }

  if(filteredData.length === 0) {
     return <p>Data not found!!!<br/> Please provide valid value</p>
  }

CC

  const handleOptionChange = (itemId, newValue) => {
    setOption((prevOption) => ({
      ...prevOption,
      [itemId]: newValue,
    }));
  };

  const handleDiscount = (itemId,newValue) => {
    setDiscount((prevDiscount) => ({
      ...prevDiscount,
      [itemId]:newValue,
    }));
  };

  const handleAddToList = (item,quantity,option,price,discount) => {

    const itemIndex = list.findIndex(existItem => existItem.name === item.name);
    if (itemIndex !== -1) {
      const newDataList = [...list];
      newDataList.splice(itemIndex, 1);
      setList(newDataList);
    }

     if(option==="" || option === undefined){
      option="Box";
     }

     if(option==="Box"){
      var QuantityInPieces = (quantity * item.outerincase * item.pieceinouter).toString();
      var TotalAmount = (QuantityInPieces * price).toFixed(2);
     }
     else if(option==="Outer"){
       QuantityInPieces = (quantity * item.pieceinouter).toString();
       TotalAmount = (QuantityInPieces * price).toFixed(2);
     }
     else{
      QuantityInPieces = quantity;
      TotalAmount = (QuantityInPieces * price).toFixed(2);
     }

     var new_obj = {
      name:item.name,
      quantity:QuantityInPieces,
      amount:TotalAmount,
      discount:discount
     }
     console.log(item,quantity,option,price,QuantityInPieces,TotalAmount,discount)
     console.log(new_obj);
     setList((prevList) => [...prevList,new_obj]);
     setCreateList(true);
  }
  
  return (
    <div>
     <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>MRP</th>
          <th>Discount%</th>
          <th>Price/Piece</th>
          <th>Price/Outer</th>
          <th>Price/Case</th>
          <th>Quantity</th>
          <th>IN</th>
          <th>Add?</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.mrp}</td>
            <td>
            <input
              type="number"
              placeholder='0'
              min={0}
              max={100}
              value={discount[item.id] || 0}
              onChange={(e) => handleDiscount(item.id,e.target.value)}
           />
            </td>
            <td>{calculatePricePerPieceAfterDiscount(item,discount[item.id])}</td>
            <td>{calculatePricePerOuterAfterDiscount(item,discount[item.id])}</td>
            <td>{calculatePricePerCaseAfterDiscount(item,discount[item.id])}</td>
            <td>
            <input
              className='input_quantity'
              type="number"
              min={0}
              placeholder='0'
              value={quantity[item.id] || ''}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
         </td>
         <td>
         <label>
           <select className='custom_select' value={option[item.id] || 'Box'} onChange={(e) => handleOptionChange(item.id, e.target.value)}>
             <option value="Box">Box</option>
             <option value="Outer">Outer</option>
             <option value="Piece">Piece</option>
           </select>
         </label>
         </td>
         <td>
         <button key={item.id} onClick={()=>handleAddToList(item,quantity[item.id],option[item.id],calculatePricePerPieceAfterDiscount(item,discount[item.id]),discount[item.id])}>Add to list</button>
         </td>
          </tr>
        ))}
      </tbody>
    </table>

    {createList &&
    <div>
    <h3>Final List created:</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity in Pieces</th>
          <th>Amount</th>
          <th>Discount%</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.amount}</td>
            <td>{item.discount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h4>Total Amount in Final List:{amount}</h4>
    <ExcelCreation data={list}/>
    </div>}
    </div>
  )
}

export default DataComponent