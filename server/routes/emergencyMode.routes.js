import express from 'express';
import activateEmergencyMode from '../controllers/emergencyMode.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/activate', protect, activateEmergencyMode);

export default router;
