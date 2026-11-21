import express from 'express';
import { getTreks, getTrekBySlug } from '../controllers/trekController.js';

const router = express.Router();

router.route('/').get(getTreks);
router.route('/:slug').get(getTrekBySlug);

export default router;
