import React from "react";
import Nav from "./Component/nav";
import Home from "./Component/home"
export default function App(){
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Nav />
      <Home />
    </div>
  );
}