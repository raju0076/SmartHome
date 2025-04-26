const EnergyPage = ({ devices }) => {
    // Simulate energy usage based on device power and status
    const calculateEnergyUsage = () => {
      return devices.map(device => {
        // In a real app, we'd track actual usage time
        const hoursUsed = device.status === 'on' ? 24 : 0; // Simulate 24h if on
        const kWh = (device.powerUsage * hoursUsed) / 1000;
        return {
          ...device,
          energyUsage: kWh
        };
      });
    };
  
    const energyData = calculateEnergyUsage();
    const totalEnergy = energyData.reduce((sum, device) => sum + (device.energyUsage || 0), 0);
  
    return (
      <div>
        <h2>Energy Usage</h2>
        <div className="energy-report">
          <h3>Total Consumption: {totalEnergy.toFixed(2)} kWh</h3>
          {energyData.map(device => (
            <div key={device.id} className="energy-item">
              <span>{device.name}</span>
              <span>{device.energyUsage?.toFixed(2) || '0.00'} kWh</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default EnergyPage;