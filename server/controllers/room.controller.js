import Room from '../models/room.model.js';
import Device from '../models/device.model.js';

export const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    const newRoom = await Room.create({
      user: req.user._id,
      name,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ user: req.user._id }).populate('devices');

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
};
