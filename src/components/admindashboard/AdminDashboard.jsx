import React from 'react';
import {
  Box,
  Button,
  Checkbox, 
  Chip,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  Add,
  Delete,
  Download,
  Edit,
  FilterList,
  MoreVert,
  Payment,
  PictureAsPdf,
  Receipt,
  Visibility,
} from '@mui/icons-material';

const salesData = [
  { customer: 'Thomas', reference: 'SL0101', date: '19 Jan 2023', status: 'Completed', total: 550, paid: 550, due: 0, paymentStatus: 'Paid', biller: 'Admin' },
  { customer: 'Rose', reference: 'SL0102', date: '26 Jan 2023', status: 'Completed', total: 250, paid: 250, due: 0, paymentStatus: 'Paid', biller: 'Admin' },
  { customer: 'Benjamin', reference: 'SL0103', date: '08 Feb 2023', status: 'Completed', total: 570, paid: 570, due: 0, paymentStatus: 'Paid', biller: 'Admin' },
  { customer: 'Lilly', reference: 'SL0104', date: '12 Feb 2023', status: 'Pending', total: 300, paid: 0, due: 300, paymentStatus: 'Due', biller: 'Admin' },
  { customer: 'Freda', reference: 'SL0105', date: '17 Mar 2023', status: 'Pending', total: 700, paid: 0, due: 700, paymentStatus: 'Due', biller: 'Admin' },
  { customer: 'Alwin', reference: 'SL0106', date: '24 Mar 2023', status: 'Completed', total: 400, paid: 400, due: 0, paymentStatus: 'Paid', biller: 'Admin' },
  { customer: 'Maybelle', reference: 'SL0107', date: '06 Apr 2023', status: 'Pending', total: 120, paid: 0, due: 120, paymentStatus: 'Due', biller: 'Admin' },
];

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedSale, setSelectedSale] = React.useState(null);

  const handleClick = (event, sale) => {
    setAnchorEl(event.currentTarget);
    setSelectedSale(sale);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSale(null);
  };

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" gutterBottom>
          Sales List
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage Your Sales
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <FilterList />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" startIcon={<Add />}>
          Add New Sales
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Customer Name</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Due</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Biller</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.reference}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.reference}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>
                  <Chip
                    label={sale.status}
                    color={sale.status === 'Completed' ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell>${sale.total}</TableCell>
                <TableCell>${sale.paid}</TableCell>
                <TableCell>${sale.due}</TableCell>
                <TableCell>
                  <Chip
                    label={sale.paymentStatus}
                    color={sale.paymentStatus === 'Paid' ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>{sale.biller}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleClick(event, sale)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Visibility /> Sale Detail
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Edit /> Edit Sale
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Receipt /> Show Payments
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Payment /> Create Payment
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Download /> Download PDF
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Delete /> Delete Sale
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
