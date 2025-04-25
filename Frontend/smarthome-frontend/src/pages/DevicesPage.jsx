import { useState } from 'react';
import DeviceCard from '../components/Dashboard/DeviceCard';
import AddDeviceForm from '../components/Devices/AddDeviceForm';

const DevicesPage = ({ devices, rooms, addDevice, updateDevice }) => {
  const [showAddForm, setShowAddForm] = useState(false);

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
        updates = { temperature: value };
        break;
      default:
        return;
    }

    updateDevice(deviceId, updates);
  };

  return (
    <div>
      <h2>Devices</h2>
      <button 
        className="btn btn-primary" 
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Cancel' : 'Add New Device'}
      </button>
      
      {showAddForm && (
        <AddDeviceForm 
          rooms={rooms} 
          onAddDevice={(device) => {
            addDevice(device);
            setShowAddForm(false);
          }} 
        />
      )}
      
      <div className="dashboard-grid">
        {devices.map(device => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            onAction={handleDeviceAction} 
          />
        ))}
      </div>
    </div>
  );
};

export default DevicesPage;