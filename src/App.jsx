import React from "react";
import Nav from "./Component/nav";
import { Routes, Route } from "react-router-dom"
import Home from "./Component/home"
import Category from "./Category";
export default function App(){
  return (
    <div>
    <Nav/>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/category/:category" element = {<Category/>}/>
    </Routes>
    </div>
  );
}