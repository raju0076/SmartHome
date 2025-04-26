import mongoose from 'mongoose';

const deviceGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
});

export default mongoose.model('DeviceGroup', deviceGroupSchema);
