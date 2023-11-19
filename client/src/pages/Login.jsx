import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    password: '',
    userType: '', 
    srn: '', // Add SRN state for member login
    clubName: '', // Add clubName state for club login
  });

  console.log(inputs);
  
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', inputs);
      console.log(res.data);

      // Redirect based on user type
      if (inputs.userType === 'member') {
        navigate(`/member/${inputs.srn}`);
      } else if (inputs.userType === 'clubHead') {
        navigate(`/admin/${inputs.clubName}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='auth'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <select
            name='userType'
            value={inputs.userType}
            onChange={handleChange}
          >
            <option value=''>Select User Type</option>
            <option value='member'>Member</option>
            <option value='clubHead'>Club Head</option>
          </select>
          {inputs.userType === 'member' && (
            <input
              type='text'
              placeholder='SRN'
              name='srn'
              value={inputs.srn}
              onChange={handleChange}
            />
          )}
          {inputs.userType === 'clubHead' && (
            <input
              type='text'
              placeholder='Club Name'
              name='clubName'
              value={inputs.clubName}
              onChange={handleChange}
            />
          )}
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={inputs.password}
            onChange={handleChange}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
