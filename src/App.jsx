import React from "react";
import Nav from "./Component/nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Component/home";
import Gsap from "./Component/gsap_intro";
import Category from "./Category";
import Detail from "./Component/detail_product";
export default function App(){
  const location = useLocation();
  return (
    <div>  
      {location.pathname !== "/" && <Nav/>}
      <Routes>
        <Route path="/" element = {<Gsap/>}/>
        <Route path = "/Home" element = {<Home/>}/>
        <Route path = "/category/:category" element = {<Category/>}/>
        <Route path = "/product/:id" element = {<Detail/>}/>
      </Routes>
    </div>
  );
}