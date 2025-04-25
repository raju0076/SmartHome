const RoomSelector = ({ rooms, onSelectRoom }) => {
    return (
      <div>
        <select 
          onChange={(e) => onSelectRoom(e.target.value ? parseInt(e.target.value) : null)}
          defaultValue=""
        >
          <option value="">All Rooms</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default RoomSelector;