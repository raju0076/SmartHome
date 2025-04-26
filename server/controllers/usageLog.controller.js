import UsageLog from '../models/usageLog.model.js';
import Device from '../models/device.model.js';

export const logDeviceUsage = async (req, res) => {
  try {
    const { deviceId, startTime, endTime, energyConsumed } = req.body;

    const newUsageLog = new UsageLog({
      device: deviceId,
      startTime,
      endTime,
      energyConsumed,
      user: req.user._id,
    });

    await newUsageLog.save();

    res.status(201).json(newUsageLog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to log device usage', error: error.message });
  }
};

export const getEnergyUsageReport = async (req, res) => {
  try {
    const logs = await UsageLog.find({ user: req.user._id }).populate('device');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch usage logs', error: error.message });
  }
};
