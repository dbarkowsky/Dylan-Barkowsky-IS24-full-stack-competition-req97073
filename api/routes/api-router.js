import express from 'express';
import { deleteProduct, getProducts, postProduct } from '../controllers/product-api-controller.js';

const router = express.Router();

router.route('/health')
    .get((req, res) => res.status(200).send('API is up and running!'));

router.route('/products')
    .get(getProducts)
    .post(postProduct);

router.route('/products/:productId')
    .delete(deleteProduct);

export default router;
