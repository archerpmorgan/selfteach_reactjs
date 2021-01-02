import express from 'express';

import { updateProblemSet, postNewProblemSet, getAllProblemSetData, getAllBookData, flipBookSections, flipBookProblems } from '../controllers/controller.js';

const router = express.Router();

router.get('/books', getAllBookData);
router.get('/problemsets', getAllProblemSetData);
router.post('/sections', flipBookSections);
router.post('/problems', flipBookProblems);
router.post('/newproblemset', postNewProblemSet);
router.post('/problemset', updateProblemSet);



export default router;