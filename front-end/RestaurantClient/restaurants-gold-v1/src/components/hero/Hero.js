import React from 'react';
import Carousel from 'react-material-ui-carousel';
import './Hero.css'
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Hero = ({restaurants}) => {
   
    
    const navigate=useNavigate();
    
    function reviews(restaurantId)
    {
        navigate(`/Reviews/${restaurantId}`);
    }
    function menu(restaurantId)
    {
        navigate(`/Menu/${restaurantId}`);
    }


    return (
        <div className='restaurant-card-container'>
          <Carousel>
            {
            
                restaurants?.map((restaurant) =>{
                    <img src={restaurant.poster} alt="" />
                    return(
                        <Paper key={restaurant.caenId}>
                            <div className='restaurant-card-container'>
                                <div className="restaurant-card" style={{"--img": `url(${restaurant.backdrops[0]})`}}>
                                    <div className='restaurant-detail'>
                                        <div className="restaurant-poster">
                                            <img src={restaurant.poster} alt="" />
                                        </div>
                                        <div className="restaurant-title">
                                            <h4>{restaurant.title}</h4>
                                        </div>
                                        <div className="restaurant-buttons-container">
                                            <Link to={`/Trailer/${restaurant.trailerLink.substring(restaurant.trailerLink.length - 11)}`}>
                                            
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon className="play-button-icon"
                                                icon={faCirclePlay}/>
                                            </div>
                                            </Link>
                                            <div className="restaurant-review-button-container">
                                                <Button variant="info" onClick={()=> reviews(restaurant.caenId)}>Reviews</Button>
                                            </div>
                                            <div className="restaurant-menu-button-container">
                                                <Button variant="info" onClick={()=> menu(restaurant.caenId)}>Menu</Button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                 })
                
            }
          </Carousel>
        </div>
    )
}

export default Hero