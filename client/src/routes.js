import React from "react";
import { Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./loginComponent/Login";
import Register from "./loginComponent/Register";


const routes = () => [
    {
        path: "/",
        children: [
          { path: "/", element: <Home /> },
          { path: "/home", element: <Home /> },

        ],
      },
      {
        path: "login",
        children: [
          { path: "/login", element: <Login /> },
        ],
      },
      {
        path: "register",
        children: [
          { path: "/register", element: <Register /> },
        ],
      },
      
  ];
  
  export default routes;
  