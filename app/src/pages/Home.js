import ProductTable from "../components/ProductTable";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ setErrorControl }) => {
  const [products, setProducts] = useState([]);
  const API_PORT = process.env.API_PORT || 3000;
  const HOSTNAME = process.env.HOSTNAME || 'localhost';

  // Get and sort products from server
  useEffect(() => {
    (async () => {
      try {
        const { data } = await
          axios.get(`http://${HOSTNAME}:${API_PORT}/api/products`);
        setProducts(data.sort((a, b) => a.productId - b.productId));
        setErrorControl({ disabled: true });
      } catch (error) {
        console.log('API Error: ' + error);
        setErrorControl({ disabled: false, text: `We're sorry. The API could not be reached.` });
      }
    })();
  }, [HOSTNAME, API_PORT, setErrorControl]);

  return (
    <>
      <h3>{`Total Products: ${products.length}`}</h3>
      <ProductTable {...{ products }} />
    </>
  );
}

export default Home;