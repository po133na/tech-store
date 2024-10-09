
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from './Pages/Shop';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Delivery from './Pages/Delivery';
import Catalogue from './Pages/Categories';
import Signup from './Pages/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/coffee1' element={<ShopCategory category="coffee1"/>}/>
        <Route path='/coffee2' element={<ShopCategory category="coffee2"/>}/>
        <Route path='/coffee3' element={<ShopCategory category="coffee3"/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/categories' element={<Catalogue/>}/>
          <Route path=':productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/delivery' element={<Delivery/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
