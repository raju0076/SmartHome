import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Device name is required'],
  },
  type: {
    type: String,
    required: [true, 'Device type is required'],
    enum: ['Lamp', 'Fan', 'Thermostat', 'Smart AC', 'Heater', 'Washer', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['On', 'Off', 'Standby', 'Malfunctioning'],
    default: 'Off',
  },
  isConnected: {
    type: Boolean,
    default: false,
  },
  features: {
    type: mongoose.Schema.Types.Mixed, // flexible object to store various features (e.g., speed, temperature, brightness)
    default: {},
  },
  energyUsage: {
    type: Number,
    default: 0, 
  },
  lastOnTime: {
    type: Date,
  },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

export default Device;
