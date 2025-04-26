import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Room name is required'],
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
    },
  ],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;
    