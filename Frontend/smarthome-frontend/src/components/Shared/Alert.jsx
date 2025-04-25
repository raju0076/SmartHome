const Alert = ({ message, onClose }) => {
    return (
      <div className="alert alert-warning">
        {message}
        <button onClick={onClose} className="btn btn-danger" style={{ float: 'right' }}>×</button>
      </div>
    );
  };
  
  export default Alert;