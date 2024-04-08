import express from 'express';
import { getProductById } from '../controllers/productController';

const router = express.Router();

router.get('/product/:id', getProductById);

export default router;