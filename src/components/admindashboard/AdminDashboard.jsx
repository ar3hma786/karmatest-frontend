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
  Receipt,
  Visibility,
  Person,
  Print,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../state/authentication/Action';

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
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event, sale) => {
    setAnchorEl(event.currentTarget);
    setSelectedSale(sale);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSale(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
    dispatch(logout(navigate("/")));
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Container style={{ padding: 0, marginTop: 0, paddingTop: "1.5rem" }}>
        {/* User Dropdown Menu and Action Buttons */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <IconButton>
            <Download />
          </IconButton>
          <IconButton>
            <Print />
          </IconButton>
          <IconButton
            onClick={handleUserMenuClick}
          >
            <Person />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            PaperProps={{
              style: {
                width: 200
              },
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>Sign out</MenuItem>
          </Menu>
        </Box>

        <Box  mb={2}>
          <Typography variant="h5" gutterBottom>
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
            sx={{
              width: 400, // Adjust width as needed
              height: 40, // Adjust height as needed
              borderRadius: '20px', // Make the corners rounded
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Ensure the border radius applies to the input
              },
              '& .MuiInputBase-input': {
                padding: '10px', // Adjust padding to align text properly
              }
            }}
          />

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                backgroundColor: '#333', // Custom gray color (equivalent to bg-gray-800)
                '&:hover': {
                  backgroundColor: '#444', // Darker gray for hover state
                },
              }}
            >
              Add New Sales
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderColor: '#333', // Custom gray color
                color: '#333', // Text color
                '&:hover': {
                  borderColor: '#444', // Darker gray for hover state
                  color: '#444',
                },
              }}
            >
              Sort By
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }} />
                <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Reference</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Grand Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Paid</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Due</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Payment Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Biller</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
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
    </div>
  );
};

export default AdminDashboard;
