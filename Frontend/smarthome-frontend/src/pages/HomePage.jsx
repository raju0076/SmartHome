import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ devices, routines, rooms }) => {
  const [stats, setStats] = useState({
    deviceCount: 0,
    activeDevices: 0,
    roomCount: 0,
    routineCount: 0
  });

  useEffect(() => {
    // Calculate stats whenever devices, routines, or rooms change
    const activeDevices = devices.filter(device => device.status === 'on').length;
    
    setStats({
      deviceCount: devices.length,
      activeDevices,
      roomCount: rooms.length,
      routineCount: routines.length
    });
  }, [devices, routines, rooms]);

  return (
    <div className="home-page">
      <h2>Smart Home Overview</h2>
      
      <div className="stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        margin: '1rem 0'
      }}>
        <div className="stat-card" style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Devices</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.deviceCount}</p>
          <p>{stats.activeDevices} currently active</p>
          <Link to="/devices" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
            Manage Devices
          </Link>
        </div>
        
        <div className="stat-card" style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Rooms</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.roomCount}</p>
          <Link to="/settings" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
            Manage Rooms
          </Link>
        </div>
        
        <div className="stat-card" style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Routines</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.routineCount}</p>
          <Link to="/routines" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
            Manage Routines
          </Link>
        </div>
      </div>
      
      <div className="quick-actions" style={{ marginTop: '2rem' }}>
        <h3>Quick Actions</h3>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/energy" className="btn btn-primary">
            View Energy Usage
          </Link>
        </div>
      </div>
      
      <div className="recent-activity" style={{ marginTop: '2rem' }}>
        <h3>Recent Activity</h3>
        <div style={{
          background: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginTop: '1rem'
        }}>
          <p>This would display recent device activity in a real application.</p>
          <p>For simulation purposes, you can imagine seeing:</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Living Room Light turned on 5 minutes ago</li>
            <li>Thermostat set to 22°C 15 minutes ago</li>
            <li>Good Night routine activated yesterday at 10:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;