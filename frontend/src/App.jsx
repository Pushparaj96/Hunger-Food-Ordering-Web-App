import React,{useState} from 'react';
import Navbar from './components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Cart from './pages/cart/cart';
import PlaceOrder from './pages/placeOrder/placeOrder';
import Footer from './components/footer/Footer';
import LoginPopUp from './components/loginPopup/LoginPopUp';
import MyOrders from './pages/myOrders/MyOrders';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
       <Navbar setShowLogin={setShowLogin}/>
       <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/myorders' element={<MyOrders/>}/>
       </Routes>
      </div>
      <Footer/>
    </>
  )
}


export default App;