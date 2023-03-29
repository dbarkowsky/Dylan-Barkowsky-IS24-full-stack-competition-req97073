import { TableCell } from '@mui/material';

const HeaderCell = ({ children }) => (
  <TableCell sx={{
    fontWeight: 600,
  }}>
    {children}
  </TableCell>
);

export default HeaderCell;
