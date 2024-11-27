import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CategoriesContext } from './Components/Categories/Categories';
import Shop from './Pages/Shop';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Delivery from './Pages/Delivery';
import Registration from "./Components/Signup/Registration";
import Categories from "./Components/Categories/Categories";
import ProductDetails from './Pages/ProductDetails';
import ProductList from './Components/ProductList/ProductList';
import UserPage from "./Components/UserPage/UserPage";

function App() {
    const [currentUser, setCurrentUser] = useState(null); // Добавлено состояние для текущего пользователя
    const [filteredProducts, setFilteredProducts] = useState([]);

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <CategoriesContext.Provider value={{ filteredProducts, setFilteredProducts }}>
                    <Routes>
                        <Route path='/' element={<Shop />} />
                        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
                        <Route path="/sign-up" element={<Registration />} />
                        <Route path="/account" element={<UserPage currentUser={currentUser} />} />
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
