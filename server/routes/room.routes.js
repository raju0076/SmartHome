import express from 'express';
import { createRoom, getRooms } from '../controllers/room.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const roomRoutes = express.Router();

roomRoutes.post('/create-room', protect, createRoom);
roomRoutes.get('/', protect, getRooms);

export default roomRoutes;
 