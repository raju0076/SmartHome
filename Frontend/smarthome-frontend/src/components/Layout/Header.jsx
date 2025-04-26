const Header = ({ household, onLogout }) => {
    return (
      <header className="header">
        <h1>{household?.name || 'Smart Home'}</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
    );
  };
  
  export default Header;