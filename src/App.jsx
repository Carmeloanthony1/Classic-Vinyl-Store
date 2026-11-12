import React from "react";
import Nav from "./Component/nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Component/home";
import Gsap from "./Component/gsap_intro";
import Category from "./Category";
import Detail from "./Component/detail_product";
import BuySingle from "./Component/buy_single";
import Signup from "./Signup";
import Login from "./Login";
export default function App(){
  const location = useLocation();

  const halaman_tanpanav = 
    location.pathname === "/" || location.pathname === "/Payment" || location.pathname.startsWith("/product/") ||
    location.pathname === "/Signup" || location.pathname === "/Login";
  return (
    <div>  
      {!halaman_tanpanav && <Nav/>}
      <div className="flex-1 min-h-0">
        <Routes>
          <Route path = "/" element = {<Gsap/>}/>
          <Route path = "/Signup" element = {<Signup/>}/>
          <Route path = "/Login" element = {<Login/>}/>
          <Route path = "/Payment" element = {<BuySingle/>}/>
          <Route path = "/Home" element = {<Home/>}/>
          <Route path = "/category/:category" element = {<Category/>}/>
          <Route path = "/product/:id" element = {<Detail/>}/>
        </Routes>
      </div>
    </div>
  );
}