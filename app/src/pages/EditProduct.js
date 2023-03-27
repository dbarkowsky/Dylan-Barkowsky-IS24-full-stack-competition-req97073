import { useState, useEffect } from "react";
import productSchema from '../schemas/productSchema';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Constants from '../constants/Constants';
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [productName, setProductName] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [scrumMasterName, setScrumMasterName] = useState("");

  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const axiosReqConfig = {
          url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products/${productId}`,
          method: `get`,
        }
        let response = await axios(axiosReqConfig);
        if (response.status === 200) {
          // Populate values with existing record
          let {
            productName,
            productOwnerName,
            scrumMasterName,
            developers,
            startDate,
            methodology
          } = response.data;

          setProductName(productName);
          setProductOwnerName(productOwnerName);
          setScrumMasterName(scrumMasterName);
          setDevelopers(developers);
          setStartDate(startDate);
          setMethodology(methodology);
        } else {
          // Post error message
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [productId]);

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
        url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products/${productId}`,
        method: `put`,
        data: product
      }
      let response = await axios(axiosReqConfig);
      if (response.status === 200) {
        navigate('/');
      } else {

      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProductForm
      editMode={true}
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

export default EditProduct;