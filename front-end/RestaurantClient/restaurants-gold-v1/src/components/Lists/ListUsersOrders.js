import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderServices from '../services/order.service';
import RestaurantService from '../services/restaurant.service';
import AuthService from '../services/auth.service';

function ListUserOrdersComponent() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser(); 
        setUser(currentUser);

        OrderServices.getOrders().then(res => {
            if (res.data == null) {
                
            }
            setOrders(res.data);
        });

    }, []);


    const viewOrder = (id) => {
        navigate(`/user/view-order/${id}`);
    };

    return (
        <div>
            <h2 className="text-center">User Orders List</h2>
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
                            order.userName === user?.username && 
                            <tr key={order.id}>
                                <td>{order.orderNumber}</td>
                                <td>{order.orderPrice} RON</td>
                                <td>{order.restaurantTitle}</td>
                                <td>{order.userName}</td>
                                <td>{order.numberOfItems}</td>
                                <td>{order.statusOrder}</td>
                                
                                <td>
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

export default ListUserOrdersComponent;