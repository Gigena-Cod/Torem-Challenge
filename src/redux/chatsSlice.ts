import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllChats } from '../network/lib/chats';
import { ChatsState, ChatTabProps } from '../types/chat';
import { RootState } from './store';

//ACTION
export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
  const chats = await GetAllChats();
  return chats;
});

const initialState: ChatsState = {
  chats: [],
  updatedChats: false,
  isAllowedExpand: true
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsData: (state, action: PayloadAction<Array<ChatTabProps>>) => {
      state.chats = action.payload;
    },
    setUpdatedChats: (state, action: PayloadAction<boolean>) => {
      state.updatedChats = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  },
  extraReducers(builder) {
    //Cases
    builder.addCase(fetchChats.fulfilled, (state, action: PayloadAction<ChatTabProps[]>) => {
      state.chats = action.payload;
    });
  }
});

export const { setChatsData, setIsAllowedExpand, setUpdatedChats } = chatsSlice.actions;

export const getChats = (state: RootState) => state.chats;
export const getIsAllowedExpand = (state: RootState) => state.chats.isAllowedExpand;

export default chatsSlice.reducer;
