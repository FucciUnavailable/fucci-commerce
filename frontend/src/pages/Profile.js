// frontend/src/pages/Profile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();




  return (
    <div>
      <h1>Welcome, {user.name}</h1>

    </div>
  );
};

export default Profile;
