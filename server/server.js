import dotenv from 'dotenv';
import express from 'express';
// import cors from 'cors';
import connectDB from './configs/mongo.config.js';
import roomRoutes from './routes/room.routes.js';
import deviceRoutes from './routes/device.routes.js';

dotenv.config();

connectDB();

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

// Routes
// Import other route files as you build them
// import householdRoutes from './routes/household.routes.js';
// import deviceRoutes from './routes/device.routes.js';
// import routineRoutes from './routes/routine.routes.js';
// import energyRoutes from './routes/energy.routes.js';
// import alertRoutes from './routes/alert.routes.js';
// import adminRoutes from './routes/admin.routes.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/households', householdRoutes);
// app.use('/api/devices', deviceRoutes);
// app.use('/api/routines', routineRoutes);
// app.use('/api/energy', energyRoutes);
// app.use('/api/alerts', alertRoutes);
// app.use('/api/admin', adminRoutes);



app.use('/api/rooms', roomRoutes);
app.use('/api/devices', deviceRoutes);


app.get('/', (req, res) => {
  res.send('SmartHome_Manager API is running');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
