
import React from 'react';
import { Route, Routes} from "react-router-dom";
import Clients from "./clients/Clients";
import Services from "./services/Services";
import Orders from "./orders/Orders";
import Home from "./Home";

const AllRoutes = () => {
  return (

    <div>

    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/clients' element={<Clients />}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/services' element={<Services/>}/>
    </Routes>

    </div>
  );
};

export default AllRoutes;
