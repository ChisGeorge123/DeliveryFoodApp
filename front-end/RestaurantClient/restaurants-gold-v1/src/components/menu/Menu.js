import {useEffect, useRef,useState} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import "./Menu.css"
import React from 'react';
import 'reactjs-popup/dist/index.css';
import OrderServices from '../services/order.service';
import AuthService from '../services/auth.service';
const Menu = ({getRestaurantData,restaurant,setMenu}) => {
    const revText = useRef();
    let params = useParams();
      const currentDate = new Date();
    const restaurantId = params.restaurantId;
    const [numberOfItems,setNumberOfItems]=useState([]);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    var totalSum=0;
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    
    var numberoofitems=0;
    const [count, setCount] = useState(0);
    const createOrder = async (dataOrder) => {
        try {
          const response = await OrderServices.createOrder(dataOrder);
          console.log('Comanda a fost creată:', response.data);
          } catch (error) {
          console.error('Eroare la crearea comenzii:', error);
          }
      };
      const generateOrderNumber = () => {
        const timestamp = new Date().getTime(); // Get current timestamp
        const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
        return `${timestamp}-${random}`; // Combine timestamp and random number
      };
      const handleMenuClick = async () => {
        try {
          const response = await api.get(`/api/v1/restaurants/${restaurantId}`);
          setMenu(response.menu);
        } catch (err) {
          console.log(err);
        }
      };
    
    useEffect(()=>{
      const user = AuthService.getCurrentUser(); 
      setUser(user);
        getRestaurantData(restaurantId);
  },[]);
    const navigateHome = () => {
       
        navigate('/');
      };
    console.log(numberOfItems)
    const getMenu = async () =>{
        try
        {
        const response =  api.get(`/api/v1/restaurants/${restaurantId}`,{menu:restaurant.menu,menuPrice:restaurant.menuPrice});
          console.log(response.menu);
         
          setMenu(response.menu);
        }
        catch(err)
        {
          console.log(err);
        }
    }   
        getMenu();
        const itemPrice=[];
        
  return (
    <Container>
        <Row>
          <strong>
            <Col><h3 style={{color:'black'}}>Menu</h3></Col>
            </strong>
        </Row>
        <Row className="mt-2" style={{color:'black'}}>
            <Col>
                <img src={restaurant?.poster} alt="" />
                
            </Col>
            <Col>
            
            { restaurant?.menuPrices.map((foodPrice,index) => {itemPrice[index]=foodPrice })
                }
                {
                    restaurant?.menu.map((foodName,index) => {
                        
                        return(
                            <>
                                <Row>
                                    <Col>
                                    <strong>
                                  {index}. {foodName} {itemPrice[index]} RON 
                                  <div class ="button-label-button-container">
                                  <input id={index} min="0" max="10"  name="quantity" value={numberOfItems[index]} onChange={e=>{
                                    setNumberOfItems((prevArr)=>{
                                        const result = [...prevArr]
                                        result[index]=e.target.value;
                                        return result;
                                    })
                                }} 
                                    step={1}  type="number"  class="form-control" />
                                 <label class="form-label" for="form1"></label>
                                  </div>
                                  </strong>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                        
                                    </Col>
                                </Row> 
                                                               
                            </>
                        )
                    })
                    
                }


            </Col>
        </Row>
        
        <ul>{
        <div className="wrapper" style={{color:'black'}}>
     <strong>
      <h1>Comanda ta</h1>
      </strong>
      <form >
        <fieldset>
          <label>
            
            <p>
                {   
                    restaurant?.menu.map((foodName,index) => {
                        if(numberOfItems[index]>0 ){totalSum=totalSum+numberOfItems[index]*itemPrice[index]
                        
                            numberoofitems=numberoofitems+1
                            {
                        return(
                            <>
                                <Row>
                                    <Col>
                                    <strong>
                                  {numberOfItems[index]} - {foodName} {itemPrice[index]} RON
                                  </strong>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row> 
                                                               
                            </>
                        )
 } } })
                    
                }</p>
            <strong>
            Valoarea totala: {totalSum} RON
            </strong>
          </label>
        </fieldset>
        
        <button type="button" class="btn btn-primary" onClick={async () => {
            if(totalSum>0){const listOfNumbersOfItems = numberOfItems.filter(quantity => quantity > 0);
                    const dataOrder = {
                      orderNumber: generateOrderNumber(),
                      userName: user?.username, 
                      numberOfItems: numberoofitems, 
                      restaurantTitle: restaurant?.title, 
                      listOfItems: restaurant?.menu.filter((foodName, index) => numberOfItems[index] > 0),
                      listOfNumbersOfItems:listOfNumbersOfItems,
                      statusOrder: 'Processing the order',
                      orderPrice: totalSum, 
                      orderDate: formattedDate
                    };
                    await createOrder(dataOrder);
                
                alert('Comanda ta a fost plasata!');
        navigateHome()}
        else
        {alert('Cosul tau este gol!')}
        }} >Trimite Comanda</button>
        
      </form>
    </div>
    }
  </ul>

        <Row>
            <Col>
                <hr />
                <div>
            <h4></h4>
            
        </div>
                
            </Col>
        </Row>        
    </Container>
  )
}

export default Menu