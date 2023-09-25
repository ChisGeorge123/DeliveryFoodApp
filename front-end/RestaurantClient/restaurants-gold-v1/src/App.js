import './App.css';
import api from './api/axiosConfig';
import { useState,useEffect } from 'react';
import Layout from './components/Layout';
import {Routes,Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';

import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import Menu from './components/menu/Menu';
import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./profile/Profile";
import AuthService from './components/services/auth.service';
import EventBus from './components/Auth/EventBus';
import ListUserComponent from './components/Lists/ListUsers';
import ViewUser from './components/view/ViewUser';
import CreateUserComponent from './components/Create/CreateUser';
import UserServices from './components/services/UserServices';
import CreateRestaurantComponent from './components/Create/CreateRestaurant';
import ViewRestaurant from './components/view/ViewRestaurant';
import ListRestaurantComponent from './components/Lists/ListRestaurants';
import BoardAdmin from './components/Board/BoardAdmin';
import ViewOrder from './components/view/ViewOrder';
import ListOrderComponent from './components/Lists/ListOrders';
import ListUserOrdersComponent from './components/Lists/ListUsersOrders';
import ViewOrderUser from './components/view/ViewOrderUser';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';


function App() {

const [restaurants, setRestaurants] =useState();
const [restaurant, setRestaurant] =useState();
const [reviews, setReviews] =useState();
 const [menu, setMenu]=useState();
 const [showModeratorBoard, setShowModeratorBoard] = useState(false);
 const [showAdminBoard, setShowAdminBoard] = useState(false);
 const [showUserBoard, setShowUserBoard] = useState(false);
 const [currentUser, setCurrentUser] = useState(undefined);

 useEffect(() => {
   const user = AuthService.getCurrentUser();
   const allUsers = UserServices.getUsers();
  
   if (user) {
     setCurrentUser(user);
     setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
     setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
     setShowUserBoard(user.roles.includes("ROLE_USER"));
   }
 
   EventBus.on("logout", () => {
     logOut();
   });

   return () => {
     EventBus.remove("logout");
   };
 }, []);

 const logOut = () => {
   AuthService.logout();
   setShowModeratorBoard(false);
   setShowAdminBoard(false);
   setCurrentUser(undefined);
 };

const getRestaurants = async () =>{
  try
  {
    const response = await api.get("api/v1/restaurants");

    console.log(response.data);

    setRestaurants(response.data);
    
  }
  catch(err)
  {
    console.log(err);
  }
  
}

const getRestaurantData = async (restaurantId) =>{
  try
  {
    const response = await api.get(`/api/v1/restaurants/${restaurantId}`)
    const singleRestaurant= response.data;
    setRestaurant(singleRestaurant);
    console.log(singleRestaurant.reviewIds)
    setReviews(singleRestaurant.reviewIds)
  }
  catch(error)
  {

  }
}

  useEffect(() =>{
  getRestaurants();
},[])
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">
        TurboFood
      </Link>
      <div className="navbar-nav mr-auto">

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={`/mod/${currentUser.id}`} className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link">
              Admin Board
            </Link>
          </li>
        )}
       
       {showUserBoard && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              User Orders
            </Link>
          </li>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-items">
          <Link to={"/home"} className="nav-link">
            Restaurants
          </Link>
        </li>
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              Log Out
            </a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
    
    
    <div className="App" style={{ 
      backgroundImage: `url("https://www.elluminatiinc.com/wp-content/uploads/2020/07/blog/fooddeliveryinsoutheastasia.jpg")` 
    }}>
    
     
     <Routes>
      <Route path="/" element={<Layout/>} >
      <Route path="/home" element={<Home restaurants={restaurants}/>}></Route>
      <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
      <Route path="/Reviews/:restaurantId" element={<Reviews getRestaurantData={getRestaurantData} restaurant={restaurant} reviews={reviews} setReviews={setReviews} />}></Route>
      <Route path="/menu/:restaurantId" element={<Menu getRestaurantData={getRestaurantData} restaurant={restaurant} setMenu={setMenu}/>}></Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/admin" element={<BoardAdmin />} />
      <Route path="/admin/restaurant" element={<ListRestaurantComponent />} />
      <Route path="/admin/user" element={<ListUserComponent />} />
      <Route path = "/add-user/:id" element = {<CreateUserComponent/>}/>
      <Route path = "/update-restaurant/:caenId" element = {<CreateRestaurantComponent/>}/>
      <Route path = "/create-restaurant/" element = {<CreateRestaurantComponent/>}/>
      <Route path = "/view-restaurant/:caenId" element = {<ViewRestaurant/>}/>
      <Route path = "/view-user/:id" element = {<ViewUser/>}/>
      <Route path = "/view-order/:id" element = {<ViewOrder/>}/>
      <Route path = "/mod/:id" element = {<ListOrderComponent/>}/>
      <Route path = "/user" element = {<ListUserOrdersComponent/>}/>
      <Route path = "/user/view-order/:id" element = {<ViewOrderUser/>}/>
      </Route>
     </Routes>
     
    </div></div>
  );
}

export default App;

