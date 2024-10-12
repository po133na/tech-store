import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CategoriesContext } from './Components/Categories/Categories';

import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Login from './Components/Login/Login';
import Delivery from './Pages/Delivery';
import Registration from "./Components/Signup/Registration";
import Categories from "./Components/Categories/Categories";
import ProductDetails from './Pages/ProductDetails';
import ProductList from './Components/ProductList/ProductList';

function App() {
    const [users, setUsers] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <CategoriesContext.Provider value={{ filteredProducts, setFilteredProducts }}>
                    <Routes>
                        <Route path='/' element={<Shop />} />
                        <Route path="/login" element={<Login users={users} />} />
                        <Route path="/sign-up" element={<Registration setUsers={setUsers} />} />
                        <Route path='/categories' element={<Categories />} />
                        <Route path='/categories/:productId' element={<ProductDetails />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/delivery' element={<Delivery />} />
                        <Route path='/products' element={<ProductList />} />
                    </Routes>
                </CategoriesContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
