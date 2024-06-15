import React from 'react'
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import {Route, Routes} from "react-router-dom";
import Add from './pages/add/Add';
import List from './pages/list/List';
import Orders from './pages/orders/Orders';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://127.0.0.1:4949";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>} ></Route>
          <Route path="/list" element={<List url={url}/>} ></Route>
          <Route path="/orders" element={<Orders url={url}/>} ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App