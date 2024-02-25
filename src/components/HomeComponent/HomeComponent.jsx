import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import SearchComponent from '../SearchComponent/SearchComponent';

function HomeComponent() {
    const navigation = useNavigate();
  useEffect(() => {
    console.log("Use effect ran for clearance")
    localStorage.clear()
  },[])

  return (
    <div>
      <div>
      <h1>CADculator</h1>
      </div>
   
    <div>
    <button className='discountbutton' onClick={() => {
              navigation('/discountcalculator');
            }}>Discount<br></br>Calculator</button>
    </div>
    <div>
    <SearchComponent/>
    </div>
  </div>
  )
}

export default HomeComponent