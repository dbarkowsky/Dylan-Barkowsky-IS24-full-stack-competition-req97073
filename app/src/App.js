import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NavBar from './components/NavBar';
import ErrorText from './components/ErrorText';
import { useState } from 'react';

const App = () => {
  const [errorControl, setErrorControl] = useState({ disabled: true, text: '' });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <div className='app'>
          <NavBar />
          <ErrorText text={errorControl.text} disabled={errorControl.disabled} ></ErrorText>
          <Routes>
            <Route path='/'>
              <Route index element={<Home {...{ setErrorControl }} />} />
              <Route path='product/:productId' element={<EditProduct {...{ setErrorControl }} />} />
              <Route path='product/new' element={<AddProduct {...{ setErrorControl }} />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
