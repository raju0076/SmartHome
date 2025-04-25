const DeviceCard = ({ device, onAction }) => {
    const getDeviceIcon = () => {
      switch (device.type) {
        case 'light':
          return '💡';
        case 'thermostat':
          return '🌡️';
        case 'fan':
          return '🌀';
        default:
          return '⚙️';
      }
    };
  
    const handleTurnOn = () => {
      onAction(device.id, 'turnOn');
    };
  
    const handleTurnOff = () => {
      onAction(device.id, 'turnOff');
    };
  
    const handleTempChange = (e) => {
      onAction(device.id, 'setTemperature', parseInt(e.target.value));
    };
  
    return (
      <div className="device-card">
        <h3>{getDeviceIcon()} {device.name}</h3>
        <div className="device-status">
          <span className={`status-${device.status}`}>
            {device.status === 'on' ? 'ON' : 'OFF'}
          </span>
          {device.type === 'thermostat' && device.status === 'on' && (
            <span>{device.temperature}°C</span>
          )}
        </div>
        
        <div className="device-actions">
          {device.status === 'off' ? (
            <button className="btn btn-primary" onClick={handleTurnOn}>Turn On</button>
          ) : (
            <>
              <button className="btn btn-danger" onClick={handleTurnOff}>Turn Off</button>
              {device.type === 'thermostat' && (
                <input 
                  type="range" 
                  min="10" 
                  max="30" 
                  value={device.temperature || 20} 
                  onChange={handleTempChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default DeviceCard;