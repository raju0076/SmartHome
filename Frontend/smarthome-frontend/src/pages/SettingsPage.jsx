import { useState } from 'react';
import AddRoomForm from '../components/Settings/AddRoomForm';

const SettingsPage = ({ household, rooms, addRoom }) => {
  const [showRoomForm, setShowRoomForm] = useState(false);

  return (
    <div>
      <h2>Household Settings</h2>
      
      <div className="household-info">
        <h3>{household?.name}</h3>
        <p>Members: {household?.members}</p>
      </div>
      
      <h3>Rooms</h3>
      <button 
        className="btn btn-primary" 
        onClick={() => setShowRoomForm(!showRoomForm)}
      >
        {showRoomForm ? 'Cancel' : 'Add Room'}
      </button>
      
      {showRoomForm && <AddRoomForm onAddRoom={addRoom} />}
      
      <ul className="room-list">
        {rooms.map(room => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;