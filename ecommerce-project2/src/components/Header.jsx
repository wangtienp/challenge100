import { NavLink, useNavigate } from 'react-router';
import './Header.css';
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/logo-white.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import { useRef, useState } from 'react';
export function Header({ cart }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate(null)
  const buttonRef = useRef(null)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  let totalQuantity = 0;
  const handleSearchButton = () => {
    if (search !== '') {
      navigate(`/?search=${search}`)
    } else {
      navigate('/')
    }
  }
  const handleKeySearch = (event) => {
    if (event.key == 'Enter') {
      buttonRef.current.click()
    }
  }
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={search} onChange={handleSearch} onKeyDown={handleKeySearch} />

        <button className="search-button" onClick={handleSearchButton} ref={buttonRef}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}