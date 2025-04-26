import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
  name: String,
  time: { type: Date, required: true }, // Schedule time
  actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }], // Devices to control
  actionType: { type: String, enum: ['on', 'off', 'adjust'], required: true }, // Action type
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who created it
}, {
  timestamps: true,
});

export default mongoose.model('Routine', routineSchema);
