import { configureStore } from '@reduxjs/toolkit';
import chatsSlice  from './chatsSlice';
import userSlice  from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    chats: chatsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
