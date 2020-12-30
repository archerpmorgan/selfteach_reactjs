import express from 'express';

import { getAllBookData, flipBookSections } from '../controllers/controller.js';

const router = express.Router();

router.get('/books', getAllBookData);
router.post('/sections', flipBookSections);


export default router;