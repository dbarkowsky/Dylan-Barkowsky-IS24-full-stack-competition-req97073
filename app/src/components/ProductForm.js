import { FormHelperText, FormLabel, Chip, Input, InputLabel, FormControl, MenuItem, Select, Button, Paper, TextField } from "@mui/material";
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
  editMode // Boolean (if it's the edit page)
}) => {
  const [currDeveloperValue, setCurrDeveloperValue] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [developerError, setDeveloperError] = useState(false);

  // Determine if the save button should be active or not
  useEffect(() => {
    const product = {
      productName,
      productOwnerName,
      developers,
      scrumMasterName,
      startDate,
      methodology
    };

    // To see if fields have improper values
    const nameChecks = {
      productName: productName.match(Constants.VALID_PRODUCT_NAME_SCHEMA),
      productOwnerName: productOwnerName.match(Constants.VALID_NAME_SCHEMA),
      scrumMasterName: scrumMasterName.match(Constants.VALID_NAME_SCHEMA),
    };

    // If any are blank or improper, submit is disabled
    const everyValueFilled = Object.values(product).every(value => value && value.length !== 0);
    const everyFieldAcceptable = Object.values(nameChecks).every(name => name);
    if (everyValueFilled && everyFieldAcceptable) {
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
    let helperText = document.getElementById('developer-helper');
    if (e.target.value !== '') {
      if (developers.length < 5) {
        if (e.target.value.match(Constants.VALID_PRODUCT_NAME_SCHEMA)) {
          setDeveloperError(false);
          helperText.innerHTML = 'Press Enter to add';
          helperText.style.color = 'grey';
        } else if (e.target.value.length < 2) {
          setDeveloperError(true);
          helperText.style.color = '#d32f2f';
          helperText.innerHTML = `Minimum 2 characters.`;
        } else {
          setDeveloperError(true);
          helperText.style.color = '#d32f2f';
          helperText.innerHTML = `No special characters`;
        }
      } else {
        setDeveloperError(true);
        helperText.style.color = '#d32f2f';
        helperText.innerHTML = 'Maximum 5 developers';
      }
    } else {
      setDeveloperError(false);
      helperText.innerHTML = 'Press Enter to add';
      helperText.style.color = 'grey';
    }
  };

  // Saving a developer chip value
  const saveValue = (e) => {
    // Check if value isn't blank
    // Check that there aren't too many to avoid spam
    if (e.target.value.length >= 2) {
      if (developers.length < 5) {
        if (e.target.value.match(Constants.VALID_PRODUCT_NAME_SCHEMA)) {
          if (e.keyCode === 13) { // Enter key
            setDevelopers([...developers, e.target.value.trim()]);
            setCurrDeveloperValue('');
          }
        }
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
            <h2>
              {editMode ? 'Edit' : 'Add'} Product
            </h2>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor="productName">Product Name</FormLabel>
              <TextField
                id="productName"
                name={'productName'}
                value={productName}
                error={!productName.match(Constants.VALID_PRODUCT_NAME_SCHEMA) && productName !== ''}
                helperText={!productName.match(Constants.VALID_PRODUCT_NAME_SCHEMA) && productName !== '' ? 'No special characters. Minimum 2.' : ''}
                onChange={(e) => {
                  setProductName(e.target.value.trim());
                }}
                aria-describedby="product-name-helper" />
              <FormHelperText id="product-name-helper"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor="productOwnerName">Product-Owner Name</FormLabel>
              <TextField
                id="productOwnerName"
                name={'productOwnerName'}
                value={productOwnerName}
                error={!productOwnerName.match(Constants.VALID_NAME_SCHEMA) && productOwnerName !== ''}
                helperText={!productOwnerName.match(Constants.VALID_NAME_SCHEMA) && productOwnerName !== '' ? 'No numbers or special characters. Minimum 2.' : ''}
                onChange={(e) => {
                  setProductOwnerName(e.target.value.trim());
                }}
                aria-describedby="owner-name-helper" />
              <FormHelperText id="owner-name-helper"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor="scrumMasterName">Scrum Master Name</FormLabel>
              <TextField
                id="scrumMasterName"
                name={'scrumMasterName'}
                value={scrumMasterName}
                error={!scrumMasterName.match(Constants.VALID_NAME_SCHEMA) && scrumMasterName !== ''}
                helperText={!scrumMasterName.match(Constants.VALID_NAME_SCHEMA) && scrumMasterName !== '' ? 'No numbers or special characters. Minimum 2.' : ''}
                onChange={(e) => {
                  setScrumMasterName(e.target.value.trim());
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
              <FormLabel htmlFor="developers">Developers</FormLabel>
              <TextField
                id="developers"
                name="developers"
                aria-describedby="developer-helper"
                value={currDeveloperValue}
                error={developerError}
                onChange={handleDeveloperChange}
                onKeyDown={saveValue}
              />
              <FormHelperText id="developer-helper">Press Enter to add</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={8}>
            <div className={"container"}>
              {developers.map((item, index) => (
                <Chip key={index} size="medium" onDelete={() => handleChipDelete(item, index)} label={item} />
              ))}
            </div>
          </Grid>
        </Grid>
        <div id="button-wrapper" style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div id="left-buttons">
            <Button component={Link} to={'/'} variant="outlined" sx={{ margin: '2em 1em' }}>Back</Button>
            <Button type="submit" variant="contained" disabled={buttonDisable} sx={{ margin: '2em 0' }}>Save</Button>
          </div>
          {
            editMode
              ? <Button
                variant="outlined"
                color='error'
                onClick={handleDelete}
                sx={{
                  height: '3em',
                  marginTop: '2em',
                  backgroundColor: 'lightred'
                }}
              >Delete</Button>
              : <></>
          }
        </div>
      </form>
    </Paper >
  );
}

export default ProductForm;
