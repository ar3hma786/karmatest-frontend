import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSaleById, editSale } from '../state/sales/Action';

const EditSale = () => {
  const { saleId } = useParams(); // Get saleId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedSale, loading, error } = useSelector((state) => state.adminSales);

  const [formData, setFormData] = useState({
    customerName: '',
    referenceId: '',
    localDateTime: '',
    status: '',
    grandTotal: '',
    paid: '',
    due: '',
    paymentStatus: '',
    biller: '',
    action: ''
  });

  useEffect(() => {
   
    dispatch(getSaleById(saleId));
  }, [dispatch, saleId]);

  useEffect(() => {
    if (selectedSale) {
      setFormData(selectedSale); 
    }
  }, [selectedSale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(editSale({ ...formData, id: saleId }))
      .then(() => {
        navigate('/admin');
      });
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <Container maxWidth="sm" style={{paddingTop: "0.5rem"}}>
      <Typography variant="h5" gutterBottom align="center">Edit Sale</Typography>
      {loading ? (
        <Typography variant="body1" align="center">Loading...</Typography>
      ) : error ? (
        <Typography variant="body1" align="center" color="error">{error}</Typography>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            mt: 2,
          }}
        >
          <TextField
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Reference ID"
            name="referenceId"
            value={formData.referenceId}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Date"
            type="datetime-local"
            name="localDateTime"
            value={formData.localDateTime}
            onChange={handleChange}
            required
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Grand Total"
            type="number"
            name="grandTotal"
            value={formData.grandTotal}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Paid"
            type="number"
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Due"
            type="number"
            name="due"
            value={formData.due}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Payment Status"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Biller"
            name="biller"
            value={formData.biller}
            onChange={handleChange}
            required
            size="small"
          />
          <TextField
            label="Action"
            name="action"
            value={formData.action}
            onChange={handleChange}
            required
            size="small"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button type="submit" variant="contained" style={{backgroundColor: "black"}} size="small">
              Save Changes
            </Button>
            <Button onClick={handleBack} variant="outlined" color="success"  size="small">
              Back
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default EditSale;
