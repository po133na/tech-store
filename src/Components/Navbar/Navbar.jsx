import React, {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/Logo_coff.png'
import cart_icon from '../Assets/cart_icon.png'

const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt=""/>
                <h1 onClick={()=>{setMenu("")}}><Link style={{textDecoration: 'none'}} to='/'>Coffee Shop</Link></h1>
            </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/shop'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("coffee1")}}><Link style={{textDecoration: 'none'}} to='/coffee1'>Option1</Link>{menu==="coffee1"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("coffee2")}}><Link style={{textDecoration: 'none'}} to='/coffee2'>Option2</Link>{menu==="coffee2"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("coffee3")}}><Link style={{textDecoration: 'none'}} to='/coffee3'>Option3</Link>{menu==="coffee3"?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
    )
}

export default Navbar