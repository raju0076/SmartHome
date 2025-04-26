import express from 'express';
import { createRoutine, getRoutines } from '../controllers/routine.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected Routes
router.post('/create-routine', protect, createRoutine);
router.get('/get-routine', protect, getRoutines);

export default router;
