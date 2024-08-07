import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createSale } from '../state/sales/Action';
import { useNavigate } from 'react-router-dom';

const AddSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add sale
    dispatch(createSale(formData));
    // Optionally, you might want to reset the form or navigate away
    setFormData({
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
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container maxWidth="sm" style={{paddingTop: "0.5rem"}}>
      <Typography variant="h5" gutterBottom align="center">Add New Sale</Typography>
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
          <Button type="submit" variant="contained" color="primary" size="small">
            Add Sale
          </Button>
          <Button onClick={handleBack} variant="outlined" color="secondary" size="small">
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddSale;
