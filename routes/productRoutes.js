const express = require("express");
const productRouter = express.Router();

const {
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductById,
} = require("../controller/productController");

// Define routes for different CRUD operations
productRouter.post("/create", createProduct);
productRouter.put("/update/:productId", updateProductById);
productRouter.delete("/delete/:productId", deleteProductById);
productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProductById);

module.exports = productRouter;
