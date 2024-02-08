import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import DiscountCalculator from "./components/DiscountCalculator/DiscountCalculator";

const Router = (props) => (

    <Routes>
        <Route path='' element={<HomeComponent/>}/>
        <Route path='/discountcalculator' element={<DiscountCalculator/>}/>
    </Routes>
);

export default Router