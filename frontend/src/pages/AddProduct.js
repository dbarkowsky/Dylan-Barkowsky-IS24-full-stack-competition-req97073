import { FormHelperText, FormLabel, Chip, Input, InputLabel, FormControl, MenuItem, Select, Button, Paper, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik } from 'formik';
import productSchema from '../schemas/productSchema';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const defaultValues = {
    productName: "",
    productOwnerName: "",
    developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: ""
  }
  const validNameSchema = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;

  const [formValues, setFormValues] = useState(defaultValues);
  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [currDeveloperValue, setCurrDeveloperValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [productName, setProductName] = useState("");
  const [productOwner, setProductOwner] = useState("");
  const [scrumMaster, setScrumMaster] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    buildFormValues();
  }, [productName, productOwner, scrumMaster, developers, methodology, dateValue])

  const buildFormValues = async () => {
    setFormValues({
      productName: productName,
      productOwnerName: productOwner,
      developers: developers,
      scrumMasterName: scrumMaster,
      startDate: dateValue,
      methodology: methodology
    });

    // If any are blank, submit is disabled
    const values = Object.values(formValues);
    console.log(values);
    if (values.every(value => value.length !== 0)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await setFormValues({
    //   productName: e.target["productName"].value,
    //   productOwnerName: e.target["productOwnerName"].value,
    //   developers: developers,
    //   scrumMasterName: e.target["scrumMasterName"].value,
    //   startDate: dateValue,
    //   methodology: methodology
    // })
    // console.log(formValues)
    // console.log(
    //   e.target["productName"].value,
    //   e.target["productOwnerName"].value,
    //   e.target["scrumMasterName"].value,
    //   dateValue,
    //   methodology,
    //   developers
    // );
    try {
      let product = await productSchema.validate(formValues);
      console.log(product);
      const axiosReqConfig = {
        url: `http://localhost:3004/api/products`,
        method: `post`,
        data: product
      }
      let response = await axios(axiosReqConfig);
      if (response.status === 201) {
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
  const saveValue = async (e) => {
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
  const handleDelete = async (item, index) => {
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
              Add Product
            </h1>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <InputLabel htmlFor="productName">Product Name</InputLabel>
              <Input
                id="productName"
                name={'productName'}
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
                <DatePicker onChange={(e) => { setDateValue(e.$d.toISOString()); }} />
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
        <Button type="submit" variant="contained" disabled={buttonDisable} sx={{ margin: '2em 0' }}>Submit</Button>
      </form>
    </Paper >
  );
}

export default AddProduct;