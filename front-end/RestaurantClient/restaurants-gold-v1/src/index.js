

 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter,  Routes } from 'react-router-dom';
 import 'bootstrap/dist/css/bootstrap.min.css'
 import './index.css';
 import App from './App';


 ReactDOM.render(
  
   <BrowserRouter>
   <Routes>
   {/* <Route path="/*" element={<App />} /> */}
   </Routes>
     <App />
   </BrowserRouter>,
   document.getElementById('root')

 );

