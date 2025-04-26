import { useState } from 'react';

const AddDeviceForm = ({ rooms, onAddDevice }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('light');
  const [roomId, setRoomId] = useState('');
  const [powerUsage, setPowerUsage] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !roomId) {
      alert('Please fill in all required fields');
      return;
    }

    const newDevice = {
      name,
      type,
      roomId: parseInt(roomId),
      status: 'off',
      powerUsage: parseInt(powerUsage)
    };

    if (type === 'thermostat') {
      newDevice.temperature = 20;
    }

    onAddDevice(newDevice);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Device Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Device Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="light">Light</option>
          <option value="thermostat">Thermostat</option>
          <option value="fan">Fan</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Room</label>
        <select 
          value={roomId} 
          onChange={(e) => setRoomId(e.target.value)} 
          required
        >
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Power Usage (Watt)</label>
        <input 
          type="number" 
          min="1" 
          value={powerUsage} 
          onChange={(e) => setPowerUsage(e.target.value)} 
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Add Device</button>
    </form>
  );
};

export default AddDeviceForm;