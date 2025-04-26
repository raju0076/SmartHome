import Routine from '../models/routine.model.js';
import Device from '../models/device.model.js';

export const createRoutine = async (req, res) => {
  try {
    const { name, time, devices, actionType } = req.body;

    const actionDevices = await Device.find({ _id: { $in: devices } });

    if (!actionDevices.length) {
      return res.status(400).json({ message: 'No devices found for the action.' });
    }

    const newRoutine = new Routine({
      name,
      time,
      actions: actionDevices,
      actionType,
      createdBy: req.user._id,
    });

    await newRoutine.save();

    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create routine', error: error.message });
  }
};

export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({ createdBy: req.user._id }).populate('actions');
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch routines', error: error.message });
  }
};
