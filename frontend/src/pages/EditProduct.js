import { FormHelperText, FormLabel, Chip, Input, InputLabel, FormControl, MenuItem, Select, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import productSchema from '../schemas/productSchema';
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import dayjs from 'dayjs';

const EditProduct = () => {
  const validNameSchema = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;

  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [currDeveloperValue, setCurrDeveloperValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [productName, setProductName] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [scrumMaster, setScrumMaster] = useState("");

  const { productId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const axiosReqConfig = {
          url: `http://localhost:3004/api/products/${productId}`,
          method: `get`,
        }
        let response = await axios(axiosReqConfig);
        console.log(response.data);
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
          setProductOwner(productOwnerName);
          setScrumMaster(scrumMasterName);
          setDevelopers(developers);
          setDateValue(startDate);
          setMethodology(methodology);
        } else {
          // Post error message
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [productId]);

  useEffect(() => {
    let product = {
      productName: productName,
      productOwnerName: productOwner,
      developers: developers,
      scrumMasterName: scrumMaster,
      startDate: dateValue,
      methodology: methodology
    };
    // If any are blank, submit is disabled
    const values = Object.values(product);
    if (values.every(value => value.length !== 0)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [productName, productOwner, scrumMaster, developers, methodology, dateValue])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let product = {
      productName: e.target["productName"].value,
      productOwnerName: e.target["productOwnerName"].value,
      developers: developers,
      scrumMasterName: e.target["scrumMasterName"].value,
      startDate: dateValue,
      methodology: methodology
    };

    try {
      product = await productSchema.validate(product);
      console.log(product);
      const axiosReqConfig = {
        url: `http://localhost:3004/api/products/${productId}`,
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

  // Keep developer field current
  const handleDeveloperChange = async (e) => {
    setCurrDeveloperValue(e.target.value);
  };

  // Saving a developer chip value
  const saveValue = (e) => {
    // Check if value isn't blank
    // Check that there aren't too many to avoid spam
    if (e.target.value !== '') {
      if (developers.length < 20) {
        if (e.target.value.match(validNameSchema)) {
          if (e.keyCode === 13) { // Enter key
            setDevelopers([...developers, e.target.value]);
            setCurrDeveloperValue('');
            document.getElementById('developer-helper').innerHTML = 'Press Enter to add';
          }
        } else {
          document.getElementById('developer-helper').innerHTML = `Invalid name. Use only letters, punctuation (,.-'), and spaces.`;
        }
      } else {
        document.getElementById('developer-helper').innerHTML = 'Maximum 20 developers';
      }
    }
  }

  // Deletion of developer chips
  const handleDelete = (item, index) => {
    let arr = [...developers]
    arr.splice(index, 1)
    setDevelopers(arr)
  }

  // Prevent form from submitting when adding developer chips
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  const fieldStyle = {
    width: '85%'
  }

  return (
    <Paper sx={{
      padding: '1em'
    }}>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>
              Edit Product
            </h1>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <InputLabel htmlFor="productName">Product Name</InputLabel>
              <Input
                id="productName"
                name={'productName'}
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                aria-describedby="product-name-helper" />
              <FormHelperText id="product-name-helper"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <InputLabel htmlFor="productOwnerName">Product-Owner Name</InputLabel>
              <Input
                id="productOwnerName"
                name={'productOwnerName'}
                value={productOwner}
                onChange={(e) => {
                  setProductOwner(e.target.value);
                }}
                aria-describedby="owner-name-helper" />
              <FormHelperText id="owner-name-helper"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <InputLabel htmlFor="scrumMasterName">Scrum Master Name</InputLabel>
              <Input
                id="scrumMasterName"
                name={'scrumMasterName'}
                value={scrumMaster}
                onChange={(e) => {
                  setScrumMaster(e.target.value);
                }}
                aria-describedby="scrum-master-helper" />
              <FormHelperText id="scrum-master-helper"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor="startDate">Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(e) => { setDateValue(e.$d.toISOString()); }}
                  value={dayjs(dateValue)}
                  disabled
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid xs={8}>
            <FormControl sx={{ minWidth: 200 }}>
              <FormLabel htmlFor="methodology">Methodology</FormLabel>
              <Select
                id="methodology"
                name="methodology"
                label="Methodology"
                value={methodology}
                onChange={(e) => {
                  setMethodology(e.target.value);
                }}
              >
                <MenuItem value={'Agile'}>Agile</MenuItem>
                <MenuItem value={'Waterfall'}>Waterfall</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <InputLabel htmlFor="developers">Developers</InputLabel>
              <Input
                id="developers"
                name="developers"
                aria-describedby="developer-helper"
                value={currDeveloperValue}
                onChange={handleDeveloperChange}
                onKeyDown={saveValue}
              />
              <FormHelperText id="developer-helper">Press Enter to add</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={8}>
            <div className={"container"}>
              {developers.map((item, index) => (
                <Chip key={index} size="small" onDelete={() => handleDelete(item, index)} label={item} />
              ))}
            </div>
          </Grid>
        </Grid>
        <Button component={Link} to={'/'} variant="text" sx={{ margin: '2em 1em' }}>Back</Button>
        <Button type="submit" variant="contained" disabled={buttonDisable} sx={{ margin: '2em 0' }}>Save</Button>
      </form>
    </Paper >
  );
}

export default EditProduct;