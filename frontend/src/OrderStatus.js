import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

function OrderStatus({ onStatusQuery }) {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const status = await onStatusQuery(orderId);
      setOrderStatus(status);
    } catch (err) {
      console.error('Failed to fetch order status:', err);
    }
    setIsLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2">Check Order Status</Typography>
      <FormControl margin="normal" fullWidth>
        <TextField
          label="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Check Status
      </Button>
      {isLoading && (
        <CircularProgress color="secondary" sx={{ marginTop: 2 }} />
      )}
      {orderStatus && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Order Status:</Typography>
          <Typography variant="body1">{orderStatus}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default OrderStatus;
