import { FormHelperText, Chip, Input, InputLabel, FormControl, MenuItem, Select, Button, Paper } from "@mui/material";
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
  const [methodology, setMethodology] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [currValue, setCurrValue] = useState("");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.productName.value);
  };

  const handleMethodology = (e) => {
    setMethodology(e.target.value);
  }

  const saveValue = (e) => {
    if (e.keyCode == 32) {
      setDevelopers((oldState) => [...oldState, e.target.value]);
      setCurrValue('');
    }
  }

  const handleDelete = (item, index) => {
    let arr = [...developers]
    arr.splice(index, 1)
    console.log(item)
    setDevelopers(arr)
  }

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
          <Grid xs={8}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel htmlFor="my-input">Methodology</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Methodology"
                value={methodology}
                onChange={handleMethodology}
              >
                <MenuItem value={'Agile'}>Agile</MenuItem>
                <MenuItem value={'Waterfall'}>Waterfall</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={4}>
            <FormControl>
              <InputLabel htmlFor="my-input">Developers</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={currValue}
                onChange={handleChange}
                onKeyDown={saveValue}
              />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
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
        <Button type="submit">Submit</Button>

      </form>
    </Paper>
  );
}

export default AddProduct;