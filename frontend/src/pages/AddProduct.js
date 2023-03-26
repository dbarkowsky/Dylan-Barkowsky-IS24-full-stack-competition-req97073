import { FormHelperText, Input, InputLabel, FormControl, MenuItem, Select, Button, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

const AddProduct = () => {
  const defaultValues = {
    productName: "",
    productOwnerName: "",
    developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: ""
  }
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.productName.value);
  };

  return (
    <Paper sx={{
      padding: '1em'
    }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>
              Add Product
            </h1>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <InputLabel htmlFor="product-name">Product Name</InputLabel>
              <Input id="product-name" name={'productName'} aria-describedby="product-name-helper" />
              <FormHelperText id="product-name-helper">We'll never share your email.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <InputLabel htmlFor="my-input">Product-Owner Name</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <InputLabel htmlFor="my-input">Scrum Master Name</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <InputLabel htmlFor="my-input">Start Date</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel htmlFor="my-input">Methodology</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Methodology"
              >
                <MenuItem value={'Agile'}>Agile</MenuItem>
                <MenuItem value={'Waterfall'}>Waterfall</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Developers</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>

      </form>
    </Paper>
  );
}

export default AddProduct;