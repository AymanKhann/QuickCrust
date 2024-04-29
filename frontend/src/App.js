import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import OrderForm from './OrderForm';
import OrderStatus from './OrderStatus';
import theme from './theme';
import backgroundImage from './bg.jpg';

function App() {
  // State variable for storing the order ID and message
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState('');

  const handleOrderSubmit = async (orderData) => {
      try {
          const response = await fetch('http://localhost:4000/order', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              body: JSON.stringify(orderData),
          });

          const data = await response.json();

          // If order is successfully submitted, update the state variables
          if (response.ok) {
              console.log('Order submitted:', data);
              setOrderId(data.orderId); // Store the order ID
              setMessage(`Order placed! Tracking ID: ${data.orderId}`); // Set the success message
          } else {
              throw new Error(data.error || 'Failed to submit order');
          }
      } catch (error) {
          console.error('Failed to submit order:', error);
          setMessage(`Error: ${error.message}`);
      }
  };

  const handleStatusQuery = async (orderId) => {
      try {
          const response = await fetch(`http://localhost:4000/order/${orderId}`);
          const data = await response.json();
          return data.status;
      } catch (error) {
          console.error('Failed to query order status:', error);
      }
  };

  const appStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
  };

  return (
      <ThemeProvider theme={theme}>
          <div style={appStyle}>
              <CssBaseline />
              <AppBar position="static" color="primary">
                  <Toolbar>
                      <Typography variant="h5" component="div">
                          QuickCrust
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Container maxWidth="md" sx={{ marginTop: 4 }}>
                  <OrderForm onOrderSubmit={handleOrderSubmit} />
                  <OrderStatus onStatusQuery={handleStatusQuery} />
                  {/* Display the message */}
                  {message && <Typography variant="h6" sx={{ marginTop: 2 }}>{message}</Typography>}
              </Container>
          </div>
      </ThemeProvider>
  );
}

export default App;
