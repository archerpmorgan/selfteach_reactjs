import express from 'express';

import { deleteProblemSet,updateProblemSet, postNewProblemSet, getAllProblemSetData, getAllBookData, flipBookSections, flipBookProblems } from '../controllers/controller.js';

const router = express.Router();

router.get('/books', getAllBookData);
router.get('/problemset', getAllProblemSetData);
router.post('/sections', flipBookSections);
router.post('/problems', flipBookProblems);
router.post('/problemset/new', postNewProblemSet);
router.post('/problemset', updateProblemSet);
router.post('/problemset/delete', deleteProblemSet);




export default router;