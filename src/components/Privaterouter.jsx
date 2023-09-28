import React from "react";
import { Navigate } from "react-router-dom";

export default function Privaterouter(props) {
     let token = window.localStorage.getItem("token");
     token = JSON.parse(token);
     return token ? props.children : <Navigate to="/" />;
}
