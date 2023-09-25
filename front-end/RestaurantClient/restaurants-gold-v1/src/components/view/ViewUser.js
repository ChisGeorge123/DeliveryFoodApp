import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import UserServices from '../services/UserServices';

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate=useNavigate()
  const cancel=()=>{
    navigate("/admin/user")
  }
  useEffect(() => {
    UserServices.getUserById(id).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  return (
    <div>
      <br />
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> User {user.username} Details</h3>
        <div className="card-body">
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Username: </label>
            <div>{user.username}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Adress: </label>
            <div>{user.adress}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> User Email ID: </label>
            <div>{user.email}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> moderatorOfRestaurantTitle: </label>
            <div>{user.moderatorOfRestaurantTitle}</div>
          </div>
          <button
             onClick={() => cancel()}
             className="btn btn-primary"
            >
            Back
         </button>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;