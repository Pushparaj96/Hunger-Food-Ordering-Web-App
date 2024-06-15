import React, { useState, useContext ,useRef ,useEffect } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {

  const [navMenu, setNavMenu] = useState("home");

  const { getTotalCartCount,token,setToken,clearCart ,setUserName , username} = useContext(StoreContext);

  const navigate = useNavigate();

  const cartCount = getTotalCartCount();

  const [dropdownVisible,setDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);


  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUserName("");
    toast.error('account logged out');
    clearCart();
    navigate("/");
  };

  const toggleDropdown = ()=>{
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(()=>{
    const handleOutsideClick=(event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown',handleOutsideClick);
    return()=>{
      document.removeEventListener('mousedown',handleOutsideClick);
    };
  },[dropdownRef]);

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setNavMenu("home")} className={navMenu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setNavMenu("menu")} className={navMenu === "menu" ? "active" : ""} >menu</a>
        <a href="#app-download" onClick={() => setNavMenu("mobile app")} className={navMenu === "mobile app" ? "active" : ""} >mobile app</a>
        <a href="#footer" onClick={() => setNavMenu("contact us")} className={navMenu === "contact us" ? "active" : ""} >contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className="dot">{cartCount}</div>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>Sign In</button>:<div className="navbar-profile" onClick={toggleDropdown} ref={dropdownRef} >
          <img src={assets.profile_icon} alt="" />
          <span className="navbar-username">Hi,{username.toUpperCase()}</span>
          <ul className={`nav-profile-dropdown ${dropdownVisible?'visible':''}`}>
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
          </div>}
      </div>
    </div>
  )
};

export default Navbar;