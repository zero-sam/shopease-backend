const Product = require('../models/Product');

// Create a new product (seller only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, inventory } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      inventory,
      seller: req.user._id, // req.user added by auth middleware
    });

    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

// Get all products (public / buyer/seller)
exports.getProducts = async (req, res) => {
  try {
    // Optionally add filtering, pagination here
    const products = await Product.find({ isActive: true })
      .populate('seller', 'businessName firstName lastName'); // populate seller info

    res.json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'businessName firstName lastName');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

// Update a product (seller only, owner only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You can only update your own products' });
    }

    // Update allowed fields
    const { name, description, price, category, images, inventory, isActive } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (images !== undefined) product.images = images;
    if (inventory !== undefined) product.inventory = inventory;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// Delete a product (seller only, owner only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own products' });
    }

    await product.deleteOne();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};
