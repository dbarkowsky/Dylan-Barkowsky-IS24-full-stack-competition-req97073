import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NavBar from './components/NavBar';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <div className='app'>
          <NavBar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="product/:productId" element={<EditProduct />} />
              <Route path="product/new" element={<AddProduct />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
