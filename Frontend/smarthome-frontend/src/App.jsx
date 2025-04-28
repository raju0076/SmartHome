import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './utilities/auth';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import RoutinesPage from './pages/RoutinesPage';
import EnergyPage from './pages/EnergyPage';
import SettingsPage from './pages/SettingsPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
  const [household, setHousehold] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [routines, setRoutines] = useState([]);
  console.log("isAuthenticated >>>>",isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate loading household data
      const savedHousehold = JSON.parse(localStorage.getItem('household')) || {
        name: 'My Smart Home',
        members: 1
      };
      setHousehold(savedHousehold);

      // Simulate loading rooms
      const savedRooms = JSON.parse(localStorage.getItem('rooms')) || [
        { id: 1, name: 'Living Room' },
        { id: 2, name: 'Bedroom' },
        { id: 3, name: 'Kitchen' }
      ];
      setRooms(savedRooms);

      // Simulate loading devices
      const savedDevices = JSON.parse(localStorage.getItem('devices')) || [
        { id: 1, name: 'Living Room Light', type: 'light', roomId: 1, status: 'off', powerUsage: 10 },
        { id: 2, name: 'Bedroom Light', type: 'light', roomId: 2, status: 'off', powerUsage: 10 },
        { id: 3, name: 'Living Room Thermostat', type: 'thermostat', roomId: 1, status: 'on', temperature: 22, powerUsage: 50 },
        { id: 4, name: 'Kitchen Light', type: 'light', roomId: 3, status: 'off', powerUsage: 15 }
      ];
      setDevices(savedDevices);

      // Simulate loading routines
      const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [
        { id: 1, name: 'Good Night', time: '22:00', actions: [
          { deviceId: 1, action: 'turnOff' },
          { deviceId: 2, action: 'turnOff' },
          { deviceId: 3, action: 'setTemperature', value: 18 }
        ]}
      ];
      setRoutines(savedRoutines);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
  };

  const addRoom = (roomName) => {
    const newRoom = {
      id: rooms.length + 1,
      name: roomName
    };
    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    localStorage.setItem('rooms', JSON.stringify(updatedRooms));
  };

  const addDevice = (device) => {
    const newDevice = {
      id: devices.length + 1,
      ...device
    };
    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    localStorage.setItem('devices', JSON.stringify(updatedDevices));
  };

  const updateDevice = (deviceId, updates) => {
    const updatedDevices = devices.map(device => 
      device.id === deviceId ? { ...device, ...updates } : device
    );
    setDevices(updatedDevices);
    localStorage.setItem('devices', JSON.stringify(updatedDevices));
  };

  const addRoutine = (routine) => {
    const newRoutine = {
      id: routines.length + 1,
      ...routine
    };
    const updatedRoutines = [...routines, newRoutine];
    setRoutines(updatedRoutines);
    localStorage.setItem('routines', JSON.stringify(updatedRoutines));
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Header household={household} onLogout={handleLogout} />}
        <div className="main-content">
        {isAuthenticated &&  <Sidebar /> }
          <div className="content">
            <Routes>
            <Route path="/home" element={isAuthenticated ? <HomePage devices={devices} routines={routines} rooms={rooms} /> : <Navigate to="/" />} />
              <Route path="/dashboard" element={isAuthenticated ? <DashboardPage devices={devices} rooms={rooms} updateDevice={updateDevice} /> : <Navigate to="/" />} />
              <Route path="/devices" element={isAuthenticated ? <DevicesPage devices={devices} rooms={rooms} addDevice={addDevice} updateDevice={updateDevice} /> : <Navigate to="/" />} />
              <Route path="/routines" element={isAuthenticated ? <RoutinesPage routines={routines} devices={devices} addRoutine={addRoutine} /> : <Navigate to="/" />} />
              <Route path="/energy" element={isAuthenticated ? <EnergyPage devices={devices} /> : <Navigate to="/" />} />
              <Route path="/settings" element={isAuthenticated ? <SettingsPage household={household} rooms={rooms} addRoom={addRoom} /> : <Navigate to="/" />} />
              <Route path="/" element={!isAuthenticated && <LandingPage/>} /> 
              {/* <Route path="/home" element={<HomePage devices={devices} routines={routines} rooms={rooms}/>}/> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;