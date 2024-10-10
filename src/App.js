import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Shop from './Pages/Shop';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import Login from './Components/Login/Login';
import Delivery from './Pages/Delivery';
import Registration from "./Components/Signup/Registration";
import {useState} from "react";
import Categories from "./Components/Categories/Categories";

function App() {
    const [users, setUsers] = useState({});
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Shop/>}/>
                    <Route path="/login" element={<Login users={users}/>}/>
                    <Route path="/sign-up" element={<Registration setUsers={setUsers}/>}/>
                    <Route path='/coffee1' element={<ShopCategory category="coffee1"/>}/>
                    <Route path='/coffee2' element={<ShopCategory category="coffee2"/>}/>
                    <Route path='/coffee3' element={<ShopCategory category="coffee3"/>}/>
                    <Route path='/products' element={<Product/>}/>
                    <Route path='/categories' element={<Categories/>}/>
                    <Route path=':productId' element={<Product/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/delivery' element={<Delivery/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
