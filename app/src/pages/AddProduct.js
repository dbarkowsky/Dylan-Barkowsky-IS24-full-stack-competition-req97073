import { useState } from "react";
import productSchema from '../schemas/productSchema';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Constants from '../constants/Constants';
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState(); // Leave null to set to current date
  const [productName, setProductName] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [scrumMasterName, setScrumMasterName] = useState("");

  const navigate = useNavigate();

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

    try {
      product = await productSchema.validate(product);
      const axiosReqConfig = {
        url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products`,
        method: `post`,
        data: product
      }
      let response = await axios(axiosReqConfig);
      if (response.status === 201) {
        navigate('/'); // Return home
      } else {

      }
    } catch (e) {
      console.log(e);
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