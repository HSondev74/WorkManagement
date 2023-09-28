import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "./Antd.css";
import Body from "./Bodylistall";
export default function Homepage() {
     return (
          <div className="h-[100vh] w-[100vw]">
               <Header />
               <Outlet />
               <Footer />
          </div>
     );
}
