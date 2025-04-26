import { useState } from 'react';
import RoutineForm from '../components/Routines/RoutineForm';

const RoutinesPage = ({ routines, devices, addRoutine }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2>Routines</h2>
      <button 
        className="btn btn-primary" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Create New Routine'}
      </button>
      
      {showForm && (
        <RoutineForm 
          devices={devices} 
          onAddRoutine={(routine) => {
            addRoutine(routine);
            setShowForm(false);
          }} 
        />
      )}
      
      <div className="routine-list">
        {routines.map(routine => (
          <div key={routine.id} className="routine-card">
            <h3>{routine.name}</h3>
            <p>Scheduled at: {routine.time}</p>
            <ul>
              {routine.actions.map((action, index) => {
                const device = devices.find(d => d.id === action.deviceId);
                return (
                  <li key={index}>
                    {device?.name || 'Unknown device'}: {action.action} {action.value ? `to ${action.value}` : ''}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutinesPage;