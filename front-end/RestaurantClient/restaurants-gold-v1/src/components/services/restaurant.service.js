import axios from 'axios';

const RESTAURANT_API_BASE_URL = "http://localhost:8080/api/v1/restaurants";

class RestaurantService {

    getRestaurant(){
        return axios.get(RESTAURANT_API_BASE_URL);
    }

    createRestaurant(restaurant){
        return axios.post(RESTAURANT_API_BASE_URL, restaurant);
    }

    getRestaurantByCaenId(restaurantCaenId){
        return axios.get(RESTAURANT_API_BASE_URL + '/' + restaurantCaenId);
    }
    getRestaurantById(restaurantId){
    return axios.get(RESTAURANT_API_BASE_URL+'/'+restaurantId);
    }

    updateRestaurant(restaurant, restaurantCaenId){
        return axios.put(RESTAURANT_API_BASE_URL + '/' + restaurantCaenId, restaurant);
    }

    deleteRestaurant(restaurantCaenId){
        return axios.delete(RESTAURANT_API_BASE_URL+ '/' + restaurantCaenId);
    }
}

export default new RestaurantService()