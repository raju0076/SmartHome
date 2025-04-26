import express from 'express';
import { logDeviceUsage, getEnergyUsageReport } from '../controllers/usageLog.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected Routes
router.post('/log', protect, logDeviceUsage);
router.get('/report', protect, getEnergyUsageReport);

export default router;
