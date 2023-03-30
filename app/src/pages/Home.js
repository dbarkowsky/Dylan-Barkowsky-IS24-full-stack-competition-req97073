import ProductTable from '../components/ProductTable';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from '../constants/Constants';
import { TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Home = ({ setErrorControl }) => {
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchField, setSearchField] = useState('scrumMaster');
  const [showClearIcon, setShowClearIcon] = useState('hidden');

  // Get and sort products from server
  useEffect(() => {
    (async () => {
      try {
        const { data } = await
          axios.get(`http://${Constants.HOSTNAME}:${Constants.API_PORT}/api/products`);
        setProducts(data.sort((a, b) => a.productId - b.productId));
        setErrorControl({ disabled: true });
      } catch (error) {
        setErrorControl({ disabled: false, text: `We're sorry. The API could not be reached. Contact your administrator or try again later.` });
      }
    })();
  }, [setErrorControl]);

  // Update filtered products based on searched value and searchField value
  useEffect(() => {
    switch (searchField) {
      case 'scrumMaster':
        setFilteredProducts(products.filter(product => product.scrumMasterName.toLowerCase().includes(searched.toLowerCase())));
        break;
      case 'developers':
        setFilteredProducts(products.filter(product => product.developers.some(developer => developer.toLowerCase().includes(searched.toLowerCase()))));
        break;
      default:
        break;
    }
  }, [searched, products, searchField]);

  // Update filter value
  const filterRows = (e) => {
    setSearched(e.target.value);
    setShowClearIcon(e.target.value ? 'visible' : 'hidden');
  }

  return (
    <>
      <div id='button-wrapper' style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h3>{`Total Products: ${filteredProducts.length}`}</h3>
        <div id='search-field' style={{ alignContent: 'center', paddingTop: '1em' }}>
          <TextField
            id='standard-search'
            type='search'
            variant='standard'
            value={searched}
            onChange={filterRows}
            sx={{
              minWidth: '15em'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position='end'
                  style={{ display: 'flex', visibility: showClearIcon }}
                  onClick={() => { setSearched(''); setShowClearIcon('hidden') }}
                >
                  <ClearIcon />
                </InputAdornment>
              )
            }}
          />
          <Select
            id='searchField'
            name='searchField'
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
            }}
            sx={{
              minWidth: '175px',
              height: '2em',
              marginLeft: '1em'
            }}
          >
            <MenuItem value={'developers'}>Developers</MenuItem>
            <MenuItem value={'scrumMaster'}>Scrum Master</MenuItem>
          </Select>
        </div>
      </div>
      <ProductTable products={filteredProducts} />
    </>
  );
}

export default Home;
