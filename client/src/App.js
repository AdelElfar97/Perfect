import logo from './logo.svg';
import './App.css';
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import React from 'react';
import Header from './header/Header';

import Home from './Home';
import Login from './loginComponent/Login';
function App() {
  
  const routing = useRoutes(routes());
  return (
    <div>
    <Header/>
    {routing}
   
    </div>
  );
 
}

export default App;
