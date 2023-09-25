import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/reviewForm';

import React from 'react'

const Reviews = ({getRestaurantData,restaurant,reviews,setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const restaurantId = params.restaurantId;
    console.log(reviews)

    useEffect(()=>{
        getRestaurantData(restaurantId);
    },[])
    
    const addReview = async (e) =>{
        e.preventDefault();

        const rev = revText.current;
        try
        {   
            const response = await api.post(`/api/v1/reviews`,{reviewBody:rev.value,caenId:restaurantId,restaurantTitle:restaurant.title});
            
            const updatedReviews =
            reviews != null
            ? [...reviews, { body: rev.value }]
            : [{ body: rev.value }];
            
            rev.value = "";
    
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }

    }

  return (
    <Container>
        <Row>
            <Col><h3 style={{color:'black'}}>Reviews</h3></Col>
        </Row>
        <Row className="mt-2" style={{color:'black'}}>
            <Col>
                <img src={restaurant?.poster} alt="" />
                
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                                
                            </Col>
                        </Row>
                    </>
                }
                  {
                  reviews?.map((r) => {
               
                        return(
                            <>
                                <Row>
                                    <strong>
                                    <Col><div >{r.body}</div></Col>
                                    </strong>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                        
                                    </Col>
                                </Row>                                
                            </>
                        )}
                    )
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
                
            </Col>
        </Row>        
    </Container>
  )
}

export default Reviews