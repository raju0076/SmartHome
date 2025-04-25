import { useState } from 'react';

const RoutineForm = ({ devices, onAddRoutine }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [actions, setActions] = useState([]);
  const [currentDeviceId, setCurrentDeviceId] = useState('');
  const [currentAction, setCurrentAction] = useState('turnOn');
  const [currentValue, setCurrentValue] = useState('');

  const handleAddAction = () => {
    if (!currentDeviceId) return;

    const newAction = {
      deviceId: parseInt(currentDeviceId),
      action: currentAction
    };

    if (currentValue) {
      newAction.value = parseInt(currentValue);
    }

    setActions([...actions, newAction]);
    setCurrentDeviceId('');
    setCurrentValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !time || actions.length === 0) {
      alert('Please fill in all required fields and add at least one action');
      return;
    }

    onAddRoutine({
      name,
      time,
      actions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Routine Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Time</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required 
        />
      </div>
      
      <h3>Actions</h3>
      <div className="form-group">
        <label>Device</label>
        <select 
          value={currentDeviceId} 
          onChange={(e) => setCurrentDeviceId(e.target.value)} 
        >
          <option value="">Select a device</option>
          {devices.map(device => (
            <option key={device.id} value={device.id}>{device.name}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Action</label>
        <select 
          value={currentAction} 
          onChange={(e) => setCurrentAction(e.target.value)}
        >
          <option value="turnOn">Turn On</option>
          <option value="turnOff">Turn Off</option>
          <option value="setTemperature">Set Temperature</option>
        </select>
      </div>
      
      {currentAction === 'setTemperature' && (
        <div className="form-group">
          <label>Temperature (°C)</label>
          <input 
            type="number" 
            min="10" 
            max="30" 
            value={currentValue} 
            onChange={(e) => setCurrentValue(e.target.value)} 
          />
        </div>
      )}
      
      <button 
        type="button" 
        className="btn btn-primary" 
        onClick={handleAddAction}
        disabled={!currentDeviceId}
      >
        Add Action
      </button>
      
      <div className="action-list">
        {actions.map((action, index) => {
          const device = devices.find(d => d.id === action.deviceId);
          return (
            <div key={index} className="action-item">
              {device?.name || 'Unknown device'}: {action.action} {action.value ? `to ${action.value}` : ''}
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={() => setActions(actions.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={actions.length === 0}
      >
        Create Routine
      </button>
    </form>
  );
};

export default RoutineForm;