import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantService from '../services/restaurant.service';

function ListRestaurantComponent() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    const deleteRestaurant = (caenId) => {
        RestaurantService.deleteRestaurant(caenId).then(res => {
            setRestaurants(restaurants.filter(restaurant => restaurant.caenId !== caenId));
        });
    };

    const viewRestaurant = (caenId) => {
        navigate(`/view-restaurant/${caenId}`);
    };
    const createRestaurant = () => {
        navigate(`/create-restaurant/`);
    };

    const editRestaurant = (caenId) => {
        navigate(`/update-restaurant/${caenId}`);
    };
   
    
    useEffect(() => {
        RestaurantService.getRestaurant().then(res => {
            if (res.data == null) {
                // navigate('add-user/add')
            }
            setRestaurants(res.data);
        });
    }, []);

    return (
        <div>
            
            <h2 className="text-center">Restaurants List</h2>
            <br />
            <div className="row" style={{textAlign:'center'}}>
            <button
             onClick={() => createRestaurant()}
             className="btn btn-info"
             >
              Add Restaurant
             </button>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Caen Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map(restaurant => (
                            <tr key={restaurant.caenId}>
                                <td>{restaurant.title}</td>
                                <td>{restaurant.caenId}</td>
                                <td>
                                    <button
                                        onClick={() => editRestaurant(restaurant.caenId)}
                                        className="btn btn-info"
                                    >
                                        Update
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteRestaurant(restaurant.caenId)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => viewRestaurant(restaurant.caenId)}
                                        className="btn btn-info"
                                    >
                                        View
                                    </button>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListRestaurantComponent;