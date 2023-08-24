const Product = require("../model/product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      image,
      quantity,
      rating,
      reviews,
    } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      image,
      quantity,
      rating,
      reviews,
    });

    await product.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      name,
      price,
      description,
      category,
      image,
      quantity,
      rating,
      reviews,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        description,
        category,
        image,
        quantity,
        rating,
        reviews,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// get all products should have pagination, search(name), sort(rating, alphabetic, price) and filter(category, price, rating)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductById,
};
