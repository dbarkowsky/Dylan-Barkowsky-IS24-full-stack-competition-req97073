import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

const HeaderRow = ({ children }) => <TableCell sx={{
  fontWeight: 600,
}}>{children}</TableCell>;

const ProductTable = ({ products }) => {


  console.log(products);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderRow >Product Number</HeaderRow>
            <HeaderRow >Product Name</HeaderRow>
            <HeaderRow >Scrum Master</HeaderRow>
            <HeaderRow >Product Owner</HeaderRow>
            <HeaderRow >Developers</HeaderRow>
            <HeaderRow >Start Date</HeaderRow>
            <HeaderRow >Methodology</HeaderRow>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;