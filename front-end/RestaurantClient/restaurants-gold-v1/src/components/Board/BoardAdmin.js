import React, { useState, useEffect } from "react";

import UserService from "../services/user.test.service";
import { useNavigate } from "react-router-dom";
import { spacing } from "@mui/system";

const BoardAdmin = () => {
  
  const navigate = useNavigate();

 

  return (
    <div className="Admin Portal" style={{color:'black'}}>
      <h2 style={{textAlign: "center"}}>Alegeți portalul dorit</h2>
    
    <div className="buttons" style={{textAlign:"center" }}>
    <button type="button" onClick={()=>navigate('/admin/restaurant')} style={{width:200,backgroundColor:'#99004d',marginTop:200}} class="btn btn-primary">Restaurants</button>
    
    <button type="button" onClick={()=>{navigate('/admin/user')}} style={{width:200,backgroundColor:'#73ca00',marginTop:200}}class="btn btn-primary">Users</button>
    </div>
    </div>
  );
};

export default BoardAdmin;