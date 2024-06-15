import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className="header" >
        <div className="header-contents">
            <h2>Good food is just a few clicks away.</h2>
            <p>Craving something delicious? Order your favorite dishes from local restaurants and get them delivered fast!</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header;