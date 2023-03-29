import { useState, useEffect } from "react";
import productSchema from '../schemas/productSchema';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Constants from '../constants/Constants';
import ProductForm from "../components/ProductForm";

const EditProduct = ({ setErrorControl }) => {
  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [productName, setProductName] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [scrumMasterName, setScrumMasterName] = useState("");

  const navigate = useNavigate();

  const { productId } = useParams();

  // Retrieve existing product to populate fields
  useEffect(() => {
    (async () => {
      setErrorControl({ disabled: true });
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
        }
      } catch (e) {
        setErrorControl({ disabled: false, text: `Either this product does not exist or the API is unreachable. Contact your administrator or try again later.` });
      }
    })();
  }, [productId, setErrorControl]);

  // Submit altered product as put request
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
      product = await productSchema.validate(product).catch(() => {
        // eslint-disable-next-line
        throw { name: 'verify' };
      });
      const axiosReqConfig = {
        url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products/${productId}`,
        method: `put`,
        data: product
      }
      let response = await axios(axiosReqConfig);
      if (response.status === 200) {
        setErrorControl({ disabled: true });
        navigate('/');
      } else if (response.status === 404) {
        setErrorControl({ disabled: false, text: `That product could not be found. Please check that the product still exists.` });
      } else if (response.status === 403) {
        // Shouldn't be able to get here, but just in case...
        setErrorControl({ disabled: false, text: `Product date may not be changed.` });
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

  // Delete data that matches the productID
  const handleDelete = async () => {
    try {
      const axiosReqConfig = {
        url: `http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products/${productId}`,
        method: `delete`,
      }
      let response = await axios(axiosReqConfig);
      if (response.status === 204) {
        setErrorControl({ disabled: true });
        navigate('/');
      } else {
        // Only if 404 status
        setErrorControl({ disabled: false, text: `That product could not be found. Please check that the product still exists.` });
      }
    } catch (e) {
      setErrorControl({ disabled: false, text: `We're sorry. The API could not be reached. Contact your administrator or try again later.` });
    }
  }

  return (
    <ProductForm
      editMode={true}
      {...{
        handleSubmit,
        handleDelete,
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
