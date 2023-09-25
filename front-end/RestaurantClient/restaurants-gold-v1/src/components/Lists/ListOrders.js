import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OrderServices from '../services/order.service';
import RestaurantService from '../services/restaurant.service';
import AuthService from '../services/auth.service';
import UserServices from '../services/UserServices';
function ListOrderComponent() {
    const {id}=useParams();
    const [orders, setOrders] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [user,setUser]=useState([]);
    const navigate = useNavigate();

    const deleteOrder = (id) => {
        OrderServices.deleteOrder(id).then(res => {
            setOrders(orders.filter(order => order.id !== id));
        });
    };

    const viewOrder = (id) => {
        navigate(`/view-order/${id}`);
    };

   
    
    useEffect(() => {
        UserServices.getUserById(id).then((res) => {
            setUser(res.data);});
        OrderServices.getOrders().then(res => {
            if (res.data == null) {
               
            }
            setOrders(res.data);
        });
        
    }, []);

    return (
        <div>
            <h2 className="text-center">orders List</h2>
            <br />
            <div className="row" style={{textAlign:'center'}}>
                {orders.length === 0 ? (
                <p>Momentan nu aveți nicio comandă.</p>
            ) : (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Order Price</th>
                            <th>Restaurant Title</th>
                            <th>Order User</th>
                            <th>Number Of Items</th>
                            <th>Status Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            order.restaurantTitle === user?.moderatorOfRestaurantTitle && 
                            <tr key={order.id}>
                                <td >{order.orderNumber}</td>
                                <td>{order.orderPrice} RON</td>
                                <td>{order.restaurantTitle}</td>
                                <td>{order.userName}</td>
                                <td>{order.numberOfItems}</td>
                                <td>{order.statusOrder}</td>
                                
                                <td>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteOrder(order.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => viewOrder(order.id)}
                                        className="btn btn-info"
                                    >
                                        View Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
            </div>
        </div>
    );
}

export default ListOrderComponent;