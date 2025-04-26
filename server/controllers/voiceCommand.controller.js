import Device from '../models/device.model.js';
import Routine from '../models/routine.model.js';

const validCommands = [
  'turn on',
  'turn off',
  'set temperature',
  'adjust speed',
  'turn on all lights',
  'turn off all lights',
];

const handleVoiceCommand = async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ message: 'No command provided.' });
  }

  let action = '';
  let deviceName = '';
  let commandResponse = '';
  
  // Check if the command is valid
  if (!validCommands.some(cmd => command.toLowerCase().includes(cmd))) {
    return res.status(400).json({ message: 'Invalid command.' });
  }

  // Parsing the command to perform actions
  try {
    if (command.toLowerCase().includes('turn off all lights')) {
      // Turn off all lights
      const lights = await Device.find({ type: 'light' });
      lights.forEach(light => {
        light.status = 'off';
        light.save();
      });
      commandResponse = 'All lights have been turned off.';
    } 
    else if (command.toLowerCase().includes('turn on all lights')) {
      // Turn on all lights
      const lights = await Device.find({ type: 'light' });
      lights.forEach(light => {
        light.status = 'on';
        light.save();
      });
      commandResponse = 'All lights have been turned on.';
    }
    else if (command.toLowerCase().includes('turn off')) {
      deviceName = command.split('turn off')[1].trim();
      const device = await Device.findOne({ name: deviceName });
      if (device) {
        device.status = 'off';
        await device.save();
        commandResponse = `${deviceName} has been turned off.`;
      } else {
        commandResponse = `Device named ${deviceName} not found.`;
      }
    } 
    else if (command.toLowerCase().includes('turn on')) {
      deviceName = command.split('turn on')[1].trim();
      const device = await Device.findOne({ name: deviceName });
      if (device) {
        device.status = 'on';
        await device.save();
        commandResponse = `${deviceName} has been turned on.`;
      } else {
        commandResponse = `Device named ${deviceName} not found.`;
      }
    }
    else if (command.toLowerCase().includes('set temperature')) {
      const [commandPrefix, temp] = command.split('set temperature');
      const temperature = parseInt(temp.trim());
      const thermostat = await Device.findOne({ type: 'thermostat' });

      if (thermostat) {
        thermostat.currentTemperature = temperature;
        await thermostat.save();
        commandResponse = `Thermostat temperature has been set to ${temperature}°C.`;
      } else {
        commandResponse = 'No thermostat device found.';
      }
    }

    return res.status(200).json({ message: commandResponse });
  } catch (error) {
    return res.status(500).json({ message: 'Error executing the command', error: error.message });
  }
};

export default handleVoiceCommand;
