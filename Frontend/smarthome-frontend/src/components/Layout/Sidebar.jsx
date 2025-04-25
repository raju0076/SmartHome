import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/devices" className={({ isActive }) => isActive ? 'active' : ''}>Devices</NavLink>
        </li>
        <li>
          <NavLink to="/routines" className={({ isActive }) => isActive ? 'active' : ''}>Routines</NavLink>
        </li>
        <li>
          <NavLink to="/energy" className={({ isActive }) => isActive ? 'active' : ''}>Energy</NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;