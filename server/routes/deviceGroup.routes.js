import express from 'express';
import { createDeviceGroup, controlDeviceGroup } from '../controllers/deviceGroup.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route to create a device group
router.post('/create', protect, createDeviceGroup);

// Route to control devices in a group
router.post('/control', protect, controlDeviceGroup);

export default router;
