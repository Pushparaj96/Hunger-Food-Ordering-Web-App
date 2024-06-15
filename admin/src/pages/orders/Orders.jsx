import React from 'react';
import './orders.css';
import axios from 'axios';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

    const statusHandler = async (event,orderId) =>{
      const response = await axios.post(`${url}/api/order/status`,{
        orderId,
        status:event.target.value
      })
      if(response.data.success){
        await fetchAllOrders();
      }
    }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (`${item.name} x ${item.quantity}`);
                  } else {
                    return (`${item.name} x ${item.quantity} , `)
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.name}
              </p>
              <div className="order-item-address">
                <p>{`${order.address.door} , ${order.address.street} ,`}</p>
                <p>{`${order.address.area} , `}</p>
                <p>{`${order.address.city} , ${order.address.pincode}.`}</p>
              </div>
              <p className="order-item-phone">
                <p>{order.address.mobile}</p>
              </p>
            </div>
                <p>Items:{order.items.length}</p>
                <p>&#8377;{order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                  <option value="Food Being Prepared">Food Being Prepared</option>
                  <option value="Out for Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Orders