import { NotificationFailure, NotificationSuccess } from '../../components/Notifications';
import { apiClient } from '../apiClient';

const GetAllChats = async () => {
  try {
    const response = await apiClient.get('/chats', {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    return response.data.chats;
  } catch (error: any) {
    NotificationFailure(error.message);
  }
};

const PostNewChat = async (chatData: any) => {
  try {
    await apiClient.post('/chats', chatData, {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
  } catch (error: any) {
    NotificationFailure(error.message);
  }
};

const DeleteChat = async (chatId: string) => {
  try {
    const response = await apiClient.delete(`/chats/${chatId}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    NotificationSuccess(response.message);
  } catch (error: any) {
    NotificationFailure(error.message);
  }
};

const PostSendMessage = async (chatId: string, data: { message: string }) => {
  try {
    const response = await apiClient.post(`/chats/${chatId}`, data, {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });

    
  } catch (error: any) {
    console.log('error al enviar');
    NotificationFailure(error.message);
  }
};

export { GetAllChats, PostNewChat, DeleteChat, PostSendMessage };
