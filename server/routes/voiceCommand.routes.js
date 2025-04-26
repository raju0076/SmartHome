import express from 'express';
import handleVoiceCommand from '../controllers/voiceCommand.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/command', protect, handleVoiceCommand);

export default router;
