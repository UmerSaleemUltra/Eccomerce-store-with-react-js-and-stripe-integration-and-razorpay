// src/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress, Card, CardContent, CardMedia, Typography, Button, Modal, Box } from '@mui/material';
import PaymentButton from './payment';
import PaymentButtons from './Paymentbutton';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Default width
  maxWidth: 600, // Maximum width for larger screens
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Allows scrolling if content is too long
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', backgroundColor: '#f9f9f9' }}>
      {products.map((product) => (
        <Card key={product.id} sx={{ width: 200, m: 2, p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff', textAlign: 'center', '&:hover': { boxShadow: 6 } }}>
          <CardMedia
            component="img"
            height="150"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mt: 1, mb: 1 }}>
              ${product.price}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpen(product)}>
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedProduct ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                {selectedProduct.title}
              </Typography>
              <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%', height: 'auto', objectFit: 'contain', margin: '10px 0' }} />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${selectedProduct.price}
              </Typography>
              <PaymentButton product={selectedProduct} />
              <PaymentButtons />
            </>
          ) : (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              No product selected
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;
