import React, { useContext, useState } from 'react';
import './loginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { toast } from 'react-toastify';


const LoginPopUp = ({ setShowLogin }) => {

    const { url, setToken , setUserName} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }))
    };

    const onLogin = async (event) => {
        event.preventDefault();

        let endpoint = (currState === "Login" ? "/api/user/login" : "/api/user/register");
        let newUrl = new URL(endpoint, url).href;

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                setUserName(response.data.username);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username",response.data.username);
                setShowLogin(false);
                toast.success(`${currState} Successfull!`);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error("Error during login/register:", error);
            toast.error("An error occurred during the request. Please try again.");
        }
    }



    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>
                        {currState}
                    </h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="password" required />
                </div>
                <button type="submit" >{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing , I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")} >Click here</span></p> : <p>Already have an account?<span onClick={() => setCurrState("Login")}>Login here</span></p>}

            </form>
        </div>
    )
}

export default LoginPopUp;