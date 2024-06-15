import { createContext, useState, useEffect } from "react";
import axios from "axios";



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://127.0.0.1:4949";
    const [token,setToken] = useState("");
    const [username,setUserName] = useState("");
    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if(token){
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] - 1;
            if (newCount > 0) {
                return { ...prev, [itemId]: newCount };
            } else {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }
        });
        if(token){
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}})
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    };

    const getTotalCartCount=()=>{
        let totalCount=0;
        for(const itemId in cartItems){
            totalCount += cartItems[itemId];
        }
        return totalCount;
    };

    const fetchFoodList = async()=>{
        const response=await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    }

    const loadCartData=async(token)=>{
        const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    const clearCart = ()=>{
        setCartItems({});
    };

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");

            if(storedToken){
                setToken(storedToken);
                await loadCartData(storedToken);
            }
            if (storedUsername){
                setUserName(storedUsername);
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartCount,
        url,
        token,
        setToken,
        clearCart,
        username,
        setUserName
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;