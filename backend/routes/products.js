const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router.post("/products", productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/products/:p_id", productController.getProductById);
router.patch("/products/:p_id", productController.updateProductById);
router.delete("/products/:p_id", productController.deleteProductById);

module.exports = router;
