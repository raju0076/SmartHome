const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
    const className = `btn btn-${variant}`;
    
    return (
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;