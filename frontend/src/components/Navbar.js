import React from 'react'
import logo from "../img/instaclone.png"
import icon from '../img/camera.png'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = ({ login }) => {
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    //console.log(token);
    if (login || token) {
      return [
        <>
          <Link to='/createpost'><li><div className='createpost' ><img className='createpostimg' src={icon} alt="" /></div></li></Link>
        </>
      ]
    } else {
      return [
        <>
          <Link to='/signup'>
            <li>Sign Up</li>
          </Link>
          <Link to='/signin'>
            <li>Sign In</li>
          </Link>
        </>
      ]
    }
  };

  return (
    <div className='navbar'>
      <div className="logo createlogo">
        <img className='logoimg createlogoimg' src={logo} alt="" /></div>
      <ul className='nav-menu'>
        {loginStatus()}
      </ul>
    </div>
  )
}

export default Navbar