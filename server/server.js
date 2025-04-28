import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongo.config.js';
import roomRoutes from './routes/room.routes.js';
import deviceRoutes from './routes/device.routes.js';
import authRoutes from './routes/auth.routes.js';
import routineRoutes from './routes/routine.routes.js';
import usageLogRoutes from './routes/usageLog.routes.js';
import voiceCommandRoutes from './routes/voiceCommand.routes.js';
import deviceGroupRoutes from './routes/deviceGroup.routes.js';
import emergencyModeRoutes from './routes/emergencyMode.routes.js';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);


app.use('/api/rooms', roomRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/usage-logs', usageLogRoutes);
app.use('/api/voice-command', voiceCommandRoutes);
app.use('/api/device-group', deviceGroupRoutes);
app.use('/api/emergency-mode', emergencyModeRoutes);


app.get('/', (req, res) => {
  res.send('SmartHome_Manager API is running');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
