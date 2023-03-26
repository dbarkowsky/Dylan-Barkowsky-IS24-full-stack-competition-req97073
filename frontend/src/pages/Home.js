import ProductTable from "../components/ProductTable";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await
          axios.get(`http://localhost:3004/api/products`);
        setProducts(data);
      } catch (error) {
        console.log('API Error: ' + error);
      }
    })();
  }, []);

  return (
    <>
      <h3>{`Total Products: ${products.length}`}</h3>
      <ProductTable {...{ products }} />
    </>
  );
}

export default Home;