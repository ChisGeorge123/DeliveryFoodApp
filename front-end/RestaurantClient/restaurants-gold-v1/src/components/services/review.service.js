import axios from 'axios';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/v1/reviews";

class ReviewsService {

    getReviews(){
        return axios.get(REVIEW_API_BASE_URL);
    }

    createReviews(reviews){
        return axios.post(REVIEW_API_BASE_URL, reviews);
    }

}

export default new ReviewsService()