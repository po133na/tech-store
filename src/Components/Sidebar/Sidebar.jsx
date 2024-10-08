import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const Sidebar = [
    {
        title: 'Shop',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <IoIcons.IoMdLogIn />,
        cName: 'nav-text'
    },
    {
        title: 'All Products',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Catalogue',
        path: '/catalogue',
        icon: <AiIcons.AiOutlineBook />,
        cName: 'nav-text'
    },
    {
        title: 'Cart',
        path: '/',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Delivery',
        path: '/delivery',
        icon: <FaIcons.FaCar />,
        cName: 'nav-text'
    },
]