import React from 'react';
import './footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <img src={assets.logo} alt="" />
                 <p>Elevate your meals with Hungerrr. We connect you to your favorite restaurants, making delicious food ordering a breeze. Download the app today!</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+91-9876543210</li>
                        <li>contact@hungerrr.com</li>
                    </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &#169; Hungerrr.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer