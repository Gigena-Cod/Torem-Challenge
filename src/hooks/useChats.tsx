import axios from 'axios';
import { useDispatch } from 'react-redux';
import { NotificationFailure } from '../components/Notifications';

const useUser = () => {
  
  const BASE_API = 'http://localhost:8080';
  const dispatch = useDispatch();
  const getDataUser = async () => {
    try {
      const res = await axios.get(`${BASE_API}/users`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });

     
    } catch (error: any) {
      NotificationFailure(error.message);
    }
  };

  return {
    getDataUser
  };
};

export default useUser;
