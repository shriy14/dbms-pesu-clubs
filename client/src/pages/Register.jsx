import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputs, setInputs] = useState({
    clubName: '',
    email: '',
    password: '',
    userType: '', 
    facultyId: '',
    headSrn: '',
    srn: '',
    name: '',
    clubType:'',
  });
 console.log(inputs)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', inputs);
      console.log(res);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const renderAdditionalFields = () => {
    if (inputs.userType === 'club') {
      return (
        <>
          <input type="text" placeholder="Faculty ID" name="facultyId" onChange={handleChange} />
          <input type="text" placeholder="Head SRN" name="headSrn" onChange={handleChange} />
          <input type="text" placeholder="Full Name" name="name" onChange={handleChange} />
          <select name="clubType" onChange={handleChange}>
          <option value="">Select Club Type</option>
          <option value="Dance">Dance</option>
          <option value="Technical">Technical</option>
          <option value="Sports">Sports</option>
          <option value="Music">Music</option>
          </select>
        </>
      );
    } else if (inputs.userType === 'member') {
      return (
        <>
          <input type="text" placeholder="SRN" name="srn" onChange={handleChange} />
          <input type="text" placeholder="Full Name" name="name" onChange={handleChange} />
      
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="auth">
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="Club Name" name="clubName" onChange={handleChange} />
          <input type="text" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
          <select name="userType" onChange={handleChange}>
            <option value="">Select User Type</option>
            <option value="club">Club</option>
            <option value="member">Member</option>
          </select>
          {renderAdditionalFields()}
          <button onClick={handleSubmit}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
