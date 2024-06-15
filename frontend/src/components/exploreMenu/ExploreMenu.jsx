import React from 'react';
import './exploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu' >
        <h2>Find your perfect meal in our diverse menu!</h2>
        <p className='explore-menu-text'>Dive into our deliciously diverse menu and discover your next favorite meal – from savory classics to exotic delights, we have it all!</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu;