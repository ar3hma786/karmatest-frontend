import React, { useEffect, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../state/authentication/Action';
import { getSales } from '../state/sales/Action'; // Import getSales action

const AdminDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const userMenuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access sales data and loading state from Redux store
  const { sales, loading, error } = useSelector((state) => state.adminSales);

  const handleClick = (event, sale) => {
    setAnchorEl(event.currentTarget);
    setSelectedSale(sale);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSale(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
    setTimeout(() => {
      dispatch(logout());
      navigate('/');
    }, 1000);
  };

  const handleAdminMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getSales()); // Dispatch getSales action on component mount

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuAnchorEl(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>
        {/* User Dropdown Menu and Action Buttons */}
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <IconButton>
            <Download />
          </IconButton>
          <IconButton>
            <Print />
          </IconButton>
          <IconButton onClick={handleUserMenuClick}>
            <Person />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleAdminMenuClose} // Use onClose to handle menu close
            PaperProps={{
              style: {
                width: 200,
              },
            }}
            ref={userMenuRef}
          >
            <MenuItem onClick={handleUserMenuClose}>Sign out</MenuItem>
          </Menu>
        </Box>

        <Box mb={3}>
          <Typography variant="h4" gutterBottom style={{ fontWeight: 600, color: '#333' }}>
            Sales List
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ color: '#555' }}>
            Manage Your Sales
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
              width: { xs: '100%', md: 400 }, // Responsive width
              height: 40,
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
              '& .MuiInputBase-input': {
                padding: '10px',
              },
            }}
          />

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                backgroundColor: '#000000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              Add New Sales
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderColor: '#000000',
                color: '#000000',
                '&:hover': {
                  borderColor: '#333333',
                  color: '#333333',
                },
              }}
            >
              Sort By
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            Error: {error}
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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
                {sales.map((sale) => (
                  <TableRow key={sale.referenceId}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{sale.customerName}</TableCell>
                    <TableCell>{sale.referenceId}</TableCell>
                    <TableCell>{sale.localDateTime}</TableCell>
                    <TableCell>
                      <Chip
                        label={sale.status}
                        color={sale.status === 'Completed' ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>${sale.grandTotal}</TableCell>
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
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
