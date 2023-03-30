import { useEffect, useState } from 'react';
import productSchema from '../schemas/productSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Constants from '../constants/Constants';
import ProductForm from '../components/ProductForm';

const AddProduct = ({ setErrorControl }) => {
  const [product, setProduct] = useState({
    productName: '',
    productOwnerName: '',
    developers: [],
    scrumMasterName: '',
    startDate: new Date(Date.now()).toISOString(),
    methodology: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    setErrorControl({ disabled: true });
  }, [setErrorControl]);

  // Submits product as post request
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    try {
      // Validate form data
      let validProduct = await productSchema.validate(product).catch(() => {
        // eslint-disable-next-line
        throw { name: 'verify' };
      });

      // Setup and send product data
      const axiosReqConfig = {
        url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products`,
        method: `post`,
        data: validProduct
      }
      response = await axios(axiosReqConfig);
      if (response.status === 201) {
        navigate('/'); // Return home
        setErrorControl({ disabled: true });
      }
    } catch (e) {
      if (e.name === 'verify') {
        // Live form validation should keep this from ever running, but just in case.
        setErrorControl({ disabled: false, text: `The product has fields with invalid values. Please see the highlighted fields and make the suggested corrections.` });
      } else {
        setErrorControl({ disabled: false, text: `We're sorry. The API could not be reached. Contact your administrator or try again later.` });
      }
    }
  };

  return (
    <ProductForm
      {...{
        handleSubmit,
        product,
        setProduct,
      }}
    />
  );
}

export default AddProduct;
