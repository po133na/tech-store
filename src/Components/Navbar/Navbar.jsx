import React, {useState} from 'react'
import './Navbar.css'

import logo from '../Assets/Logo_coff.png'
import cart_icon from '../Assets/cart_icon.png'

import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Sidebar } from '../Sidebar/Sidebar';

import { IconContext } from 'react-icons';

const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{color: 'white'}}>
        <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to="#" className='menu-bars-close'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {Sidebar.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        )
                    })}
                </ul>
            </nav>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <h1 onClick={() => { setMenu(""); } }><Link style={{ textDecoration: 'none', color: 'white' }} to='/'>Coffeer</Link></h1>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setMenu("shop"); } }><Link style={{ textDecoration: 'none' }} to='/shop'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("coffee1"); } }><Link style={{ textDecoration: 'none' }} to='/coffee1'>Option1</Link>{menu === "coffee1" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("coffee2"); } }><Link style={{ textDecoration: 'none' }} to='/coffee2'>Option2</Link>{menu === "coffee2" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("coffee3"); } }><Link style={{ textDecoration: 'none' }} to='/coffee3'>Option3</Link>{menu === "coffee3" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button style={{height: '30px', width: '100px'}}>Login</button></Link>
                <Link to='/sign-up'><button style={{height: '30px', width: '150px'}}>Registration</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
            </IconContext.Provider>
            </>
    )
}

export default Navbar