import { useState } from 'react';
import DeviceCard from '../components/Dashboard/DeviceCard';
import RoomSelector from '../components/Dashboard/RoomSelector';
import RoutineList from '../components/Dashboard/RoutineList';
import Alert from '../components/Shared/Alert';

const DashboardPage = ({ devices, rooms, routines, updateDevice }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [alert, setAlert] = useState(null);

  const filteredDevices = selectedRoom 
    ? devices.filter(device => device.roomId === selectedRoom)
    : devices;

  const handleDeviceAction = (deviceId, action, value = null) => {
    const device = devices.find(d => d.id === deviceId);
    
    if (!device) return;

    let updates = {};
    
    switch (action) {
      case 'turnOn':
        updates = { status: 'on' };
        break;
      case 'turnOff':
        updates = { status: 'off' };
        break;
      case 'setTemperature':
        if (value < 10 || value > 30) {
          setAlert('Temperature must be between 10°C and 30°C');
          return;
        }
        updates = { temperature: value };
        break;
      default:
        return;
    }

    // Check for potential malfunctions
    if (device.type === 'thermostat' && updates.status === 'on' && device.status === 'on') {
      const hoursOn = 25; // Simulated value - in a real app, we'd track time
      if (hoursOn > 24) {
        setAlert(`Warning: ${device.name} has been on for ${hoursOn} hours. Consider turning it off.`);
      }
    }

    updateDevice(deviceId, updates);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <RoomSelector rooms={rooms} onSelectRoom={setSelectedRoom} />
      
      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
      
      <div className="dashboard-grid">
        {filteredDevices.map(device => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            onAction={handleDeviceAction} 
          />
        ))}
      </div>
      
      <RoutineList routines={routines} />
    </div>
  );
};

export default DashboardPage;