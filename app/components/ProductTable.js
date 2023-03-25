import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProductTable = ({ data }) => {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Number</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Scrum Master</TableCell>
            <TableCell align="right">Product Owner</TableCell>
            <TableCell align="right">Developers</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Methodology</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productId}
              </TableCell>
              <TableCell align="right">{row.productName}</TableCell>
              <TableCell align="right">{row.scrumMasterName}</TableCell>
              <TableCell align="right">{row.productOwnerName}</TableCell>
              <TableCell align="right">{row.developers}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.methodology}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;