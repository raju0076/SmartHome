import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utilities/auth';
import { BASEURL } from '../../baseurl';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
   const userObj = {name,email,password};
   fetch(`${BASEURL}/api/auth/register`,{
    method:"POST",
    headers:{
      "content-type":"application/json",
    },
    body:JSON.stringify(userObj)
   }).then((data)=>{
    console.log("Data ",data)
   }).catch((err)=>{
    console.log("err in signup",err)
   })
    
    // navigate('/');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="alert alert-warning">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;