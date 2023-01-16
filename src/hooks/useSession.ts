import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { NotificationFailure, NotificationSuccess } from '../components/Notifications';
import { setLoginData } from '../redux/userSlice';
import { UserDataState } from '../types/chat';

const useSession = () => {
  const BASE_API = 'http://localhost:8080';

  const dispatch = useDispatch();
  const router = useRouter();

  const signUp = async (formData: any) => {
    try {
      const res = await axios.post(`${BASE_API}/signup`, formData);
      NotificationSuccess(res.data.message);
      router.push('/');
    } catch (error: any) {
      NotificationFailure(error.message);
    }
  };

  const login = async (formData: any) => {
    try {
      const res = await axios.post(`${BASE_API}/login`, formData);
      localStorage.setItem('token', res.data.token);

      const userDate: UserDataState = {
        userId: res.data.userId,
        authToken: res.data.token
      };

      dispatch(setLoginData(userDate));
      router.push('/chat');
      
    } catch (error: any) {
      NotificationFailure(error.message);
    }
  };

  return {
    signUp,
    login
  };
};

export default useSession;
