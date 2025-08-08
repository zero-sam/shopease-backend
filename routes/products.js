const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const productController = require('../controllers/productController');

// Public product listing, can be accessed by logged-in buyers or sellers (or removed auth for full public)
router.get('/public', auth, roleAuth(['buyer', 'seller']), productController.getProducts);

// Get product details by ID (also protected, you can make this public by removing auth)
router.get('/:id', auth, roleAuth(['buyer', 'seller']), productController.getProductById);

// Seller routes for product management
router.post('/', auth, roleAuth(['seller']), productController.createProduct);

router.put('/:id', auth, roleAuth(['seller']), productController.updateProduct);

router.delete('/:id', auth, roleAuth(['seller']), productController.deleteProduct);

module.exports = router;
