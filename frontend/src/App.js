import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

const App = () => {
  return (

    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="product/:productId" element={<EditProduct />} />
            <Route path="product/new" element={<AddProduct />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
