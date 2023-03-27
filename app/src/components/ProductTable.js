import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HeaderCell from './HeaderCell';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ProductTable = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderCell >Product Number</HeaderCell>
            <HeaderCell >Product Name</HeaderCell>
            <HeaderCell >Scrum Master</HeaderCell>
            <HeaderCell >Product Owner</HeaderCell>
            <HeaderCell >Developers</HeaderCell>
            <HeaderCell >Start Date</HeaderCell>
            <HeaderCell >Methodology</HeaderCell>
            <HeaderCell></HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => (
            <TableRow
              key={row.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? 'white' : '#ededed' }}
            >
              <TableCell component="th" scope="row">
                {row.productId}
              </TableCell>
              <TableCell >{row.productName}</TableCell>
              <TableCell >{row.scrumMasterName}</TableCell>
              <TableCell >{row.productOwnerName}</TableCell>
              <TableCell >{row.developers.join(', ')}</TableCell>
              <TableCell >{new Date(row.startDate).toLocaleDateString()}</TableCell>
              <TableCell >{row.methodology}</TableCell>
              <TableCell ><Button variant='outlined' component={Link} to={`/product/${row.productId}`} >Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
