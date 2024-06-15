import React, { useContext, useState, useEffect } from 'react';
import './placeOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const { getTotalCartAmount, getTotalCartCount, token, food_list, cartItems, url,clearCart } = useContext(StoreContext);
  const cartCount = getTotalCartCount();
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();


  const [data, setData] = useState({
    name: "",
    mobile: "",
    door: "",
    street: "",
    area: "",
    city: "",
    pincode: ""
  });

  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId, // Include the userId extracted from the token
      address: data,
      items: orderItems,
      amount: totalAmount >= 159 ? totalAmount : totalAmount + 30,
      paymentMethod: 'COD' // Specify payment method as COD
    };

    let response = await axios.post(`${url}/api/order/place`, orderData,{headers:{token}});

    if (response.data.success) {
      toast.success('Order Placed Successfully!');
      clearCart();
      navigate('/myorders');
    } else {
      toast.error('Error ! placing Order');
    }
  }

  
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }else if(cartCount===0){
      navigate('/cart');
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} type="text" placeholder='Name' name='name' value={data.name} required />
          <input onChange={onChangeHandler} type="text" placeholder='Mobile No' name='mobile' value={data.mobile} required />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} type="text" placeholder='Door No' name='door' value={data.door} required />
          <input onChange={onChangeHandler} type="text" placeholder='Street' name='street' value={data.street} required />
        </div>
        <input onChange={onChangeHandler} type="text" placeholder='Area' name='area' value={data.area} required />
        <div className="multi-fields">
          <input onChange={onChangeHandler} type="text" placeholder='City' name='city' value={data.city} required />
          <input onChange={onChangeHandler} type="text" placeholder='Pin Code' name='pincode' value={data.pincode} required />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{cartCount === 0 ? "₹0" : `₹${totalAmount}`}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{cartCount === 0 ? "₹0" : (totalAmount >= 159 ? <b>Free</b> : <b>&#8377;30</b>)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Payment Method</p>
              <p><b>Cash On Delivery</b></p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377;{cartCount === 0 ? "0" : `${totalAmount >= 159 ? totalAmount : totalAmount + 30}`}</b>
            </div>
          </div>
          <button type='submit'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
