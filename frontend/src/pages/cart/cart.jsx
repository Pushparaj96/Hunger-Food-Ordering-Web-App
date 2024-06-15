import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, getTotalCartCount, addToCart ,url } = useContext(StoreContext);
  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();
  const cartCount = getTotalCartCount();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add/Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={`${url}/images/${item.image}`} alt="" />
                    <p>{item.name}</p>
                    <p>&#8377;{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>&#8377;{item.price * cartItems[item._id]}</p>
                    <div className="cart-item-counter">
                      <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                      <p>{cartItems[item._id]}</p>
                      <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                    </div>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p><b>{cartCount === 0 ? "₹0" : `₹${totalAmount}`}</b></p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{cartCount === 0 ? "₹0" : (totalAmount >= 159 ? <b>Free</b> : <b>&#8377;30</b>)}</p>
            </div>
            <hr />
            <div className="cart-total-details" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <p>{cartCount === 0 ? " " : (totalAmount >= 150 ? " " : <span>Delivery Fee Applicable For Orders Below &#8377;159*</span>)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377;{cartCount === 0 ? "0" : `${totalAmount >= 159 ? totalAmount : totalAmount + 30}`}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')} disabled={totalAmount === 0} >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promocode , Enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;