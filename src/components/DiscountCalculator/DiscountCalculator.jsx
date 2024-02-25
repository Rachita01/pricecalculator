import React from 'react'
import SearchDisComponent from '../SearchDisComponent/SearchDisComponent'
import { useNavigate } from 'react-router-dom';

function DiscountCalculator() {
  const navigation = useNavigate();
  return (
    <div>
        <h1>Discount Calculator</h1>
        <button className='discountbutton' onClick={() => {
              navigation('/',{replace:true});
            }}>Price<br></br>Calculator</button>
        <SearchDisComponent/>
    </div>
  )
}

export default DiscountCalculator