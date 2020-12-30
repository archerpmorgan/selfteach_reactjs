import express from 'express';

import { getAllBookData, flipBookSections, flipBookProblems } from '../controllers/controller.js';

const router = express.Router();

router.get('/books', getAllBookData);
router.post('/sections', flipBookSections);
router.post('/problems', flipBookProblems);



export default router;