import { NotificationFailure } from '../../components/Notifications';
import { UserDataState } from '../../types/chat';
import { apiClient } from '../apiClient';

const GetUser = async () => {
  console.log('fetchUser');
  try {
    const response = await apiClient.get('/users', {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    const token = localStorage.getItem('token');

    const user: UserDataState = {
      ...response.data,
      authToken: token
    };

    return user

  } catch (error: any) {
    localStorage.removeItem('token');
    localStorage.cleear();
    NotificationFailure(error.message);
  }
};

export { GetUser };
