import express from 'express';
import { getHello } from '../controllers/helloController';

const router = express.Router();

router.get('/hello', getHello);

export default router;