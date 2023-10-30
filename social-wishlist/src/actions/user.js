import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loggedIn: false,
    error: null,
  },
  reducers: {
    userLogIn(state, action){
      state.loggedIn = true;
      state.user = action.payload;
    },
    userLogOut(state){
      state.user = {};
      state.loggedIn = false;
    },
    userUpdate(state, action) {
      state.user = {
        ...state.user,
        ...action.payload
      }
    }
  },
});

export const { userLogIn, userLogOut, userUpdate } = user.actions;
export default user.reducer;