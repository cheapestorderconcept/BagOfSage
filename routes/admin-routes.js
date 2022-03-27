const express = require('express');
const { deleteProducts } = require('../controller/admin/controller/product/delete-product');
const { updateProduct } = require('../controller/admin/controller/product/update-product');
const { uploadProduct } = require('../controller/admin/controller/product/upload-product');
const { getAllProduct } = require('../controller/admin/controller/product/view-product');
const { verifyToken } = require('../middlewares/hashing/jwt');

const router = express.Router();




router.post('/add-products',uploadProduct);

router.put('/update-product/:productId', updateProduct)
router.delete('/delete-product/:productId', deleteProducts)

router.use(verifyToken);
router.use('/view-product', getAllProduct)


module.exports=router;