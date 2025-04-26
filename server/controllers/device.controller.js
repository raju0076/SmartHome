import Device from '../models/device.model.js';
import Room from '../models/room.model.js';

export const createDevice = async (req, res) => {
  try {
    const { roomId, name, type, features } = req.body;

    const device = await Device.create({
      room: roomId,
      name,
      type,
      features,
    });

    await Room.findByIdAndUpdate(roomId, {
      $push: { devices: device._id },
    });

    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create device', error: error.message });
  }
};

export const connectDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await Device.findByIdAndUpdate(deviceId, { isConnected: true }, { new: true });

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Failed to connect device', error: error.message });
  }
};

export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({}).populate('room');

    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch devices', error: error.message });
  }
};
