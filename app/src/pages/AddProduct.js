import { useEffect, useState } from "react";
import productSchema from '../schemas/productSchema';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Constants from '../constants/Constants';
import ProductForm from "../components/ProductForm";

const AddProduct = ({ setErrorControl }) => {
  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState(new Date(Date.now()).toISOString()); // Must fill with something, no undefined allowed
  const [productName, setProductName] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [scrumMasterName, setScrumMasterName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setErrorControl({ disabled: true });
  }, [setErrorControl]);

  // Submits product as post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    let product = {
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      startDate,
      methodology
    };

    let response;
    try {
      // Validate form data
      product = await productSchema.validate(product).catch(() => {
        // eslint-disable-next-line
        throw { name: 'verify' };
      });

      // Setup and send product data
      const axiosReqConfig = {
        url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products`,
        method: `post`,
        data: product
      }
      response = await axios(axiosReqConfig);
      if (response.status === 201) {
        navigate('/'); // Return home
        setErrorControl({ disabled: true });
      }
    } catch (e) {
      console.log(e)
      if (e.name === 'verify') {
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
        setProductName,
        productName,
        setProductOwnerName,
        productOwnerName,
        setScrumMasterName,
        scrumMasterName,
        setStartDate,
        startDate,
        setMethodology,
        methodology,
        setDevelopers,
        developers,
      }}
    />
  );
}

export default AddProduct;
