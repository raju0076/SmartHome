import express from 'express';
import { createDevice, connectDevice, getDevices } from '../controllers/device.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const deviceRoutes = express.Router();

deviceRoutes.post('/', protect, createDevice);
deviceRoutes.patch('/:deviceId/connect', protect, connectDevice);
deviceRoutes.get('/', protect, getDevices);

export default deviceRoutes;
