import express from 'express';

import { getAllProblemSetData, getAllBookData, flipBookSections, flipBookProblems } from '../controllers/controller.js';

const router = express.Router();

router.get('/books', getAllBookData);
router.get('/problemsets', getAllProblemSetData);
router.post('/sections', flipBookSections);
router.post('/problems', flipBookProblems);



export default router;