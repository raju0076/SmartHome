import mongoose from 'mongoose';

const usageLogSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  energyConsumed: { type: Number, required: true }, // kWh or other unit
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

export default mongoose.model('UsageLog', usageLogSchema);
