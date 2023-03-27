import { FormHelperText, FormLabel, Chip, Input, InputLabel, FormControl, MenuItem, Select, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import Constants from '../constants/Constants';
import dayjs from "dayjs";

const ProductForm = ({
  handleSubmit,
  handleDelete, // Only used by edit page
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
  editMode
}) => {
  const [currDeveloperValue, setCurrDeveloperValue] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    let product = {
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      startDate,
      methodology
    };
    // If any are blank, submit is disabled
    const values = Object.values(product);
    if (values.every(value => value.length !== 0)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [productName, productOwnerName, scrumMasterName, developers, methodology, startDate])

  // Prevent form from submitting when adding developer chips
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  // Keep developer field current
  const handleDeveloperChange = async (e) => {
    setCurrDeveloperValue(e.target.value);
  };

  // Saving a developer chip value
  const saveValue = (e) => {
    // Check if value isn't blank
    // Check that there aren't too many to avoid spam
    if (e.target.value !== '') {
      if (developers.length < 5) {
        if (e.target.value.match(Constants.VALID_NAME_SCHEMA)) {
          if (e.keyCode === 13) { // Enter key
            setDevelopers([...developers, e.target.value]);
            setCurrDeveloperValue('');
            document.getElementById('developer-helper').innerHTML = 'Press Enter to add';
          }
        } else {
          document.getElementById('developer-helper').innerHTML = `Invalid name. Use only letters, punctuation (,.-'), and spaces.`;
        }
      } else {
        document.getElementById('developer-helper').innerHTML = 'Maximum 5 developers';
      }
    }
  }

  // Deletion of developer chips
  const handleChipDelete = (item, index) => {
    let arr = [...developers]
    arr.splice(index, 1)
    setDevelopers(arr)
  }

  const fieldStyle = {
    width: '85%'
  }

  return (
    <Paper sx={{
      padding: '1em'
    }} >
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>
              {editMode ? 'Edit' : 'Add'} Product
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
                value={productOwnerName}
                onChange={(e) => {
                  setProductOwnerName(e.target.value);
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
                value={scrumMasterName}
                onChange={(e) => {
                  setScrumMasterName(e.target.value);
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
                  onChange={(e) => { setStartDate(e.$d.toISOString()); }}
                  value={dayjs(startDate)}
                  disabled={editMode}
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
                <Chip key={index} size="small" onDelete={() => handleChipDelete(item, index)} label={item} />
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

export default ProductForm;