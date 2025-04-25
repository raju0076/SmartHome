import { useState, useEffect } from 'react';

const RoutineList = ({ routines }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeRoutines, setActiveRoutines] = useState([]);

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check which routines should be active now
    const now = currentTime;
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeString = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

    const active = routines.filter(routine => {
      return routine.time === currentTimeString;
    });

    setActiveRoutines(active);
  }, [currentTime, routines]);

  if (routines.length === 0) {
    return null;
  }

  return (
    <div className="routine-list" style={{ marginTop: '20px' }}>
      <h3>Scheduled Routines</h3>
      
      {activeRoutines.length > 0 && (
        <div className="alert alert-warning">
          <strong>Active now:</strong>
          <ul>
            {activeRoutines.map((routine, index) => (
              <li key={index}>{routine.name} at {routine.time}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="routine-items">
        {routines.map(routine => (
          <div key={routine.id} className="routine-item" style={{
            padding: '10px',
            margin: '5px 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <div style={{ fontWeight: 'bold' }}>{routine.name}</div>
            <div>Scheduled at: {routine.time}</div>
            <div style={{ marginTop: '5px' }}>
              <strong>Actions:</strong>
              <ul style={{ marginLeft: '20px' }}>
                {routine.actions.map((action, index) => (
                  <li key={index}>
                    Device {action.deviceId}: {action.action} {action.value ? `to ${action.value}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutineList;