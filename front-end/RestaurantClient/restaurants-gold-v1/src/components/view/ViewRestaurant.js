import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import RestaurantService from '../services/restaurant.service';

function ViewRestaurant() {
  const { caenId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const foodPrices=[];
  const navigate=useNavigate();
  const cancel=()=>{
    navigate("/admin/restaurant")
  }
  useEffect(() => {
    RestaurantService.getRestaurantByCaenId(caenId).then((res) => {
      setRestaurant(res.data);
    });
  }, [caenId]);

  return (
    <div>
      <br />
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> Restaurant {restaurant.title} Details</h3>
        <div className="card-body">
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Title: </label>
            <div>{restaurant.title}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> ReleaseDate: </label>
            <div>{restaurant.releaseDate}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Trailer Link: </label>
            <div>{restaurant.trailerLink}</div>
          </div>
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Poster: </label>
            <img src={restaurant.poster} alt="" />
          </div>
          <div className="array">
            
            <label style={{fontWeight: 'bold'}}> Backdrops: </label>
            {restaurant?.backdrops?.map(backdrops=>{return <div>{backdrops}</div>})}
            
          </div>
          <div className="array">
            
            <label style={{fontWeight: 'bold'}}> Reviews: </label>
            {restaurant?.reviewIds?.map((reviewIds,index)=>{return <div>{index}. {reviewIds.body}</div>})}
            
          </div>
          <div className="array">
            
            <label style={{fontWeight: 'bold'}}> Menu: </label>
            {restaurant?.menuPrices?.map((foodPri,index)=> {foodPrices[index]=foodPri})}
            {restaurant?.menu?.map((foodName,index)=>{return <div>{foodName} {foodPrices[index]} RON</div>})}
            
          </div>
          
          <div className="row">
            <label style={{fontWeight: 'bold'}}> Caen Id: </label>
            <div>{restaurant.caenId}</div>
          </div>
          <div className="array">
            
            <label style={{fontWeight: 'bold'}}> Manager Ids: </label>
            {restaurant?.managerIds?.map((managerIds)=>{return <div>{managerIds}</div>})}
            
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

export default ViewRestaurant;