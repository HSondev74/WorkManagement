import React, { Children } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./components/axios";
import Login from "./components/Login.jsx";
import Homepage from "./components/Homepage.jsx";
import DetailProduct from "./components/DetailProduct";
import Body from "./components/Bodylistall";
import Privaterouter from "./components/Privaterouter";
import { store } from "./components/Storeredux";
import { Provider } from "react-redux";
const router = createBrowserRouter([
     {
          path: "/",
          element: <Login />,
     },
     {
          path: "/homepage",
          element: (
               <Privaterouter>
                    <Homepage />
               </Privaterouter>
          ),
          children: [
               {
                    path: "/homepage",
                    element: <Body />,
               },
               {
                    path: "/homepage/:id",
                    element: <DetailProduct />,
               },
          ],
     },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
          <Provider store={store}>
               <RouterProvider router={router} />
          </Provider>
     </React.StrictMode>
);
