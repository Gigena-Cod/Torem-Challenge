import axios from 'axios';
import { useDispatch } from 'react-redux';
import { NotificationFailure } from '../components/Notifications';
import { setLoginData, setUserData } from '../redux/userSlice';
import { UserDataState } from '../types/chat';

const useUser = () => {
  const BASE_API = 'http://localhost:8080';
  const dispatch = useDispatch();
  const getDataUser = async () => {
    try {
      const res = await axios.get(`${BASE_API}/users`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });

      const { name, lastName, email, image, userId } = res.data;

      const userData: UserDataState = {
        userId,
        name,
        lastName,
        email,
        photo: image
      };

      dispatch(setUserData(userData));

      const loginData: UserDataState = {
        userId,
        authToken: localStorage.token
      };

      dispatch(setLoginData(loginData));
    } catch (error: any) {
      NotificationFailure(error.message);
    }
  };

  return {
    getDataUser
  };
};

export default useUser;
