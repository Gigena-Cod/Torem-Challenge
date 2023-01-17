import { NotificationFailure, NotificationSuccess } from '../../components/Notifications';
import { UserDataState } from '../../types/chat';
import { apiClient } from '../apiClient';

const SignUp = async (formData: any) => {
  try {
    const res = await apiClient.post(`/signup`, formData);
    NotificationSuccess(res.data.message);
  } catch (error: any) {
    NotificationFailure(error.message);
  }
};

const Login = async (formData: any) => {
  try {
    const res = await apiClient.post(`/login`, formData);
    localStorage.setItem('token', res.data.token);

    const userData: UserDataState = {
      userId: res.data.userId,
      authToken: res.data.token
    };

    return userData;
  } catch (error: any) {
    NotificationFailure(error.message);
  }
};

export { SignUp, Login };
