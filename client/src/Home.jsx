import React from "react";
import UserTable from "./tables/UserTable";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home=()=> {
  let navigate = useNavigate();

  
  useEffect(() => {
    if(!localStorage.getItem("token"))
    { 
        navigate("/login");
      }
  }, []);

 
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);

  const zeft = () => {
    setAdd(true);
  };

  return (
    <div style={{ margin: "auto", height: 300, width: "30%" }}>
      <div style={{ textAlign: "right" }}>
        <br></br>



        <UserTable  ></UserTable> 
      </div>
    </div>
  );
}

export default Home;
