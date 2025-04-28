import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utilities/auth';
import { BASEURL } from '../../baseurl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {email,password};
     fetch(`${BASEURL}/api/auth/login`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify(userObj)
     }).then((res)=>res.json())
     .then((data)=>{
      console.log("Data ",data)
      // localStorage.setItem('token', data.token)
      auth.login(data.token)
      navigate('/home');
     }).catch((err)=>{
      console.log("err in signup",err.msg)
     })


  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="alert alert-warning">{error}</div>}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;