import ProductTable from "../components/ProductTable";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from '../constants/Constants';

const Home = ({ setErrorControl }) => {
  const [products, setProducts] = useState([]);

  // Get and sort products from server
  useEffect(() => {
    (async () => {
      try {
        const { data } = await
          axios.get(`http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products`);
        setProducts(data.sort((a, b) => a.productId - b.productId));
        setErrorControl({ disabled: true });
      } catch (error) {
        console.log('API Error: ' + error);
        setErrorControl({ disabled: false, text: `We're sorry. The API could not be reached. Contact your administrator or try again later.` });
      }
    })();
  }, [setErrorControl]);

  return (
    <>
      <h3>{`Total Products: ${products.length}`}</h3>
      <ProductTable {...{ products }} />
    </>
  );
}

export default Home;