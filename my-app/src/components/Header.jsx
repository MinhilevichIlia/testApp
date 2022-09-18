import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../assets/image/Logo.svg';
import '../styles/header.css';
import Button from 'react-bootstrap/Button';



export default function Header () {
    
    return (
        <div className="header">
            <img className="logo" src={Logo} alt ='logo'></img>
            <div className="buttonWrapper">
            <NavLink to='/profile'>
                <button className='profileLink'>Profile</button>
            </NavLink>
            <NavLink  to='/News'>
                <button className='newsLink'>News</button>
            </NavLink>
            </div>
        </div>
    )
}