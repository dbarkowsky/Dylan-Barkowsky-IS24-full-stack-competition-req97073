import { FormHelperText, FormLabel, Chip, FormControl, MenuItem, Select, Button, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import Constants from '../constants/Constants';
import dayjs from 'dayjs';

const ProductForm = ({
  handleSubmit,
  handleDelete, // Only used by edit page
  product,
  setProduct,
  editMode // Boolean (if it's the edit page)
}) => {
  const [currDeveloperValue, setCurrDeveloperValue] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [developerError, setDeveloperError] = useState(false);

  // Determine if the save button should be active or not
  useEffect(() => {
    // To see if fields have improper values
    const nameChecks = {
      productName: product.productName.match(Constants.VALID_PRODUCT_NAME_SCHEMA),
      productOwnerName: product.productOwnerName.match(Constants.VALID_NAME_SCHEMA),
      scrumMasterName: product.scrumMasterName.match(Constants.VALID_NAME_SCHEMA),
    };

    // If any are blank or improper, submit is disabled
    const everyValueFilled = Object.values(product).every(value => value && value.length !== 0);
    const everyFieldAcceptable = Object.values(nameChecks).every(name => name);
    if (everyValueFilled && everyFieldAcceptable) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [product])

  // Prevent form from submitting when adding developer chips
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  // Keep developer field current and set helper text
  const handleDeveloperChange = async (e) => {
    setCurrDeveloperValue(e.target.value);
    let helperText = document.getElementById('developer-helper');
    // Check not blank
    if (e.target.value !== '') {
      // Check aren't too many chips added
      if (product.developers.length < 5) {
        // Check that at least 2 characters
        if (e.target.value.length >= 2) {
          // Check matches schema
          if (e.target.value.match(Constants.VALID_PRODUCT_NAME_SCHEMA)) {
            setDeveloperError(false);
            helperText.innerHTML = 'Press Enter to add.';
            helperText.style.color = 'grey';
          } else {
            // Then characters are included
            setDeveloperError(true);
            helperText.style.color = '#d32f2f';
            helperText.innerHTML = `No special characters.`;
          }
        } else {
          setDeveloperError(true);
          helperText.style.color = '#d32f2f';
          helperText.innerHTML = `Minimum 2 characters.`;
        }
      } else {
        setDeveloperError(true);
        helperText.style.color = '#d32f2f';
        helperText.innerHTML = 'Maximum 5 developers.';
      }
    } else {
      setDeveloperError(false);
      helperText.innerHTML = 'Press Enter to add.';
      helperText.style.color = 'grey';
    }
  };

  // Saving a developer chip value
  const saveValue = (e) => {
    // Check that there are at least 2 characters
    if (e.target.value.length >= 2) {
      // Check that there aren't too many to avoid spam
      if (product.developers.length < 5) {
        // Check that schema matches
        if (e.target.value.match(Constants.VALID_PRODUCT_NAME_SCHEMA)) {
          if (e.keyCode === 13) { // Enter key
            setProduct({
              ...product,
              developers: [...product.developers, e.target.value.trim()]
            })
            setCurrDeveloperValue('');
          }
        }
      }
    }
  }

  // Deletion of developer chips
  const handleChipDelete = (item, index) => {
    let arr = [...product.developers]
    arr.splice(index, 1)
    setProduct({
      ...product,
      developers: arr
    })
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
              <FormLabel htmlFor='productName'>Product Name</FormLabel>
              <TextField
                id='productName'
                name={'productName'}
                value={product.productName}
                error={!product.productName.match(Constants.VALID_PRODUCT_NAME_SCHEMA) && product.productName !== ''}
                helperText={!product.productName.match(Constants.VALID_PRODUCT_NAME_SCHEMA) && product.productName !== '' ? 'No special characters. Minimum 2.' : ''}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productName: e.target.value.trim()
                  });
                }}
                aria-describedby='product-name-helper' />
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor='productOwnerName'>Product-Owner Name</FormLabel>
              <TextField
                id='productOwnerName'
                name={'productOwnerName'}
                value={product.productOwnerName}
                error={!product.productOwnerName.match(Constants.VALID_NAME_SCHEMA) && product.productOwnerName !== ''}
                helperText={!product.productOwnerName.match(Constants.VALID_NAME_SCHEMA) && product.productOwnerName !== '' ? 'No numbers or special characters. Minimum 2.' : ''}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productOwnerName: e.target.value.trim()
                  });
                }}
                aria-describedby='owner-name-helper' />
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor='scrumMasterName'>Scrum Master Name</FormLabel>
              <TextField
                id='scrumMasterName'
                name={'scrumMasterName'}
                value={product.scrumMasterName}
                error={!product.scrumMasterName.match(Constants.VALID_NAME_SCHEMA) && product.scrumMasterName !== ''}
                helperText={!product.scrumMasterName.match(Constants.VALID_NAME_SCHEMA) && product.scrumMasterName !== '' ? 'No numbers or special characters. Minimum 2.' : ''}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    scrumMasterName: e.target.value.trim()
                  });
                }}
                aria-describedby='scrum-master-helper' />
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor='startDate'>Start Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      startDate: e.$d.toISOString()
                    });
                  }}
                  value={dayjs(product.startDate)}
                  disabled={editMode}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid xs={8}>
            <FormControl sx={{ minWidth: 200 }}>
              <FormLabel htmlFor='methodology'>Methodology</FormLabel>
              <Select
                id='methodology'
                name='methodology'
                label='Methodology'
                value={product.methodology}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    methodology: e.target.value
                  });
                }}
              >
                <MenuItem value={'Agile'}>Agile</MenuItem>
                <MenuItem value={'Waterfall'}>Waterfall</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={fieldStyle}>
              <FormLabel htmlFor='developers'>Developers</FormLabel>
              <TextField
                id='developers'
                name='developers'
                aria-describedby='developer-helper'
                value={currDeveloperValue}
                error={developerError}
                onChange={handleDeveloperChange}
                onKeyDown={saveValue}
              />
              <FormHelperText id='developer-helper'>Press Enter to add</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={8}>
            <div className={'container'}>
              {product.developers.map((item, index) => (
                <Chip key={index} size='medium' onDelete={() => handleChipDelete(item, index)} label={item} />
              ))}
            </div>
          </Grid>
        </Grid>
        <div id='button-wrapper' style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div id='left-buttons'>
            <Button component={Link} to={'/'} variant='outlined' sx={{ margin: '2em 1em 0 0' }}>Back</Button>
            <Button type='submit' variant='contained' disabled={buttonDisable} sx={{ marginTop: '2em' }}>Save</Button>
          </div>
          {
            editMode
              ? <Button
                variant='outlined'
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
