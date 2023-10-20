import { createSlice } from '@reduxjs/toolkit';

const users = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = users.actions;
export default users.reducer;