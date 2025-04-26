import Device from '../models/device.model.js';

const activateEmergencyMode = async (req, res) => {
  try {
    // Get all devices
    const devices = await Device.find();

    // Turn off all devices
    devices.forEach(async (device) => {
      device.status = 'off';
      await device.save();
    });

    res.status(200).json({ message: 'Emergency mode activated. All devices have been turned off.' });
  } catch (error) {
    res.status(500).json({ message: 'Error activating emergency mode', error: error.message });
  }
};

export default activateEmergencyMode;
