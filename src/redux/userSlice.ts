import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { UserDataState } from '../types/chat';
import { GetUser } from '../network/lib/users';

// ACTION
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const user = await GetUser();
  return user || initialState;
});

const initialState: UserDataState = {
  name: '',
  lastName: '',
  email: '',
  image: '',
  userId: '',
  authToken: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setLoginData: (state, action: PayloadAction<UserDataState>) => {
      state.userId = action.payload.userId;
      state.authToken = action.payload.authToken;
    },
    setUserData: (state, action: PayloadAction<UserDataState>) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    setLogoutData: (state) => {
      state.name = '';
      state.lastName = '';
      state.email = '';
      state.image = '';
      state.userId = '';
      state.authToken = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserDataState>) => {
      state.authToken = action.payload.authToken;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.image = action.payload.image;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    });
  }
});

export const { setUserName, setLoginData, setUserData, setLogoutData } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
