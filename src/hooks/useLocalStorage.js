import { useState, useEffect } from 'react';
import JoblyApi from '../JoblyApi';

const useLocalStorage = (token) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(false);

  const getUserFromToken = token => {
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]))
      } catch (error) {
        // ignore
      }
    }
    return null;
  }

  let username = getUserFromToken(token) ? getUserFromToken(token).username : null;

  useEffect(() => {
    async function getUser() {
      try {
        const res = await JoblyApi.getUser(username)
        setUser(res.user)
      } catch(err) {
        setError(err)
      }
    }
    getUser()
    }, [])

  
  return { user, error }
}

export default useLocalStorage;

