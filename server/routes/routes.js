import express from 'express';

import { getAllBookData } from '../controllers/controller.js';

const router = express.Router();

router.get('/books', getAllBookData);

export default router;