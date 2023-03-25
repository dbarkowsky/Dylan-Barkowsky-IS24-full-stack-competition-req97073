import './App.css';
import ProductTable from './components/ProductTable';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await
          axios.get(`http://localhost:3004/api/products`);
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log('API Error: ' + error);
      }
    })();
  }, []);

  return (
    <div className="app">
      <ProductTable {...{ products }} />
    </div>
  );
}

export default App;
