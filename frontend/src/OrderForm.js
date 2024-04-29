import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function OrderForm({ onOrderSubmit }) {
  const [sandwich, setSandwich] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      name,
      sandwich,
      ingredients: ingredients.split(',').map((ing) => ing.trim()),
    };
    onOrderSubmit(orderData);
    setSandwich('');
    setIngredients('');
    setName('');
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Place a Sandwich Order
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Sandwich Name"
            value={sandwich}
            onChange={(e) => setSandwich(e.target.value)}
            required
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas"
            required
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Submit Order
        </Button>
      </Box>
    </Paper>
  );
}

export default OrderForm;
