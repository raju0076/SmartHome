import DeviceGroup from '../models/deviceGroup.model.js';
import Device from '../models/device.model.js';

// Create a new device group
const createDeviceGroup = async (req, res) => {
  try {
    const { name, deviceIds } = req.body;
    const devices = await Device.find({ '_id': { $in: deviceIds } });

    if (devices.length !== deviceIds.length) {
      return res.status(404).json({ message: 'One or more devices not found' });
    }

    const newGroup = new DeviceGroup({
      name,
      devices: deviceIds,
    });

    await newGroup.save();
    res.status(201).json({ message: 'Device group created successfully', group: newGroup });
  } catch (error) {
    res.status(500).json({ message: 'Error creating device group', error: error.message });
  }
};

// Control devices in a group (e.g., turn on all devices in the group)
const controlDeviceGroup = async (req, res) => {
  try {
    const { groupId, action } = req.body;
    const group = await DeviceGroup.findById(groupId).populate('devices');

    if (!group) {
      return res.status(404).json({ message: 'Device group not found' });
    }

    // Perform action on each device in the group
    group.devices.forEach(async (device) => {
      if (action === 'turn on') {
        device.status = 'on';
      } else if (action === 'turn off') {
        device.status = 'off';
      }
      await device.save();
    });

    res.status(200).json({ message: `All devices in the group have been ${action}` });
  } catch (error) {
    res.status(500).json({ message: 'Error controlling device group', error: error.message });
  }
};

export { createDeviceGroup, controlDeviceGroup };
