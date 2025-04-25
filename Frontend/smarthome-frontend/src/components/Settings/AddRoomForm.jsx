import { useState } from 'react';

const AddRoomForm = ({ onAddRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      alert('Please enter a room name');
      return;
    }

    onAddRoom(roomName);
    setRoomName('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Room Name</label>
        <input 
          type="text" 
          value={roomName} 
          onChange={(e) => setRoomName(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Room</button>
    </form>
  );
};

export default AddRoomForm;