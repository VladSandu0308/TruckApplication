import { useState } from 'react';

export default function useRole() {
  const getRole = () => {
    const tokenString = sessionStorage.getItem('role');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [role, setRole] = useState(getRole());

  const saveRole = userToken => {
    console.log('token ' + userToken);
    sessionStorage.setItem('role', JSON.stringify(userToken));
    setRole(userToken);
  };

  return {
    setRole: saveRole,
    role
  }

}