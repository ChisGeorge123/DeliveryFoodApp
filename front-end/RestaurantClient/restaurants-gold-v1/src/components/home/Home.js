import Hero from "../hero/Hero"
import React,{ useState, useEffect } from 'react';
const Home = ({restaurants}) => {

    return (
       <Hero restaurants={restaurants}/>      
    )
}
export default Home
