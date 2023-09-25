import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import OrderServices from '../services/order.service';


function ViewOrderUser() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();
  
  const cancel=()=>{
    navigate("/user")
  }
  
  useEffect(() => {
    OrderServices.getOrderById(id).then((res) => {
        setOrder(res.data);
        
    });
  },[id]);
  return (
    <div>
      <br />
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> Order {order.orderNumber} Details</h3>
        <div className="card-body">
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Order Number: </label>
            <div>{order.orderNumber}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Restaurant Title: </label>
            <div>{order.restaurantTitle}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> List Of Items: </label>
            <div className='flex' style={{display:'flex'}}>
            <div>{order?.listOfNumbersOfItems?.map((NumbersOfItems)=>(<div>{NumbersOfItems } </div>))}</div>
            <div>{order?.listOfItems?.map((item,index)=>(<div> - {item}</div>))}
            </div>
          </div></div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> User Name: </label>
            <div>{order.userId}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Status Order: </label>
            <div>{order.statusOrder}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Order Price: </label>
            <div>{order.orderPrice} RON</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Order Date: </label>
            <div>{order.orderDate} RON</div>
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

export default ViewOrderUser;