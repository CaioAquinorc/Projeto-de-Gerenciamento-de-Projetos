const express = require('express')
const router = express.Router()
const productController = require("../controllers/product.controller")

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getProductById)

router.post("/", productController.insertProduct)

router.put("/:id", productController.updateById)

router.delete("/:id", productController.deleteById)

module.exports = router