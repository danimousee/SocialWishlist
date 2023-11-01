import { createSlice } from '@reduxjs/toolkit';

const interests = createSlice({
  name: 'interests',
  initialState: {
    interests: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchInterestsStart(state) {
      state.loading = true;
    },
    fetchInterestsSuccess(state, action) {
      state.interests = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchInterestsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addInterestStart(state) {
      state.loading = true;
    },
    addInterestSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    addInterestFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInterestStart(state) {
        state.loading = true;
    },
    deleteInterestSuccess(state, action) {
        state.interests = state.interests.filter((interest) => interest.id !== action.payload);
        state.loading = false;
        state.error = null;
    },
    deleteInterestFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
    },
  },
});

export const { fetchInterestsStart, fetchInterestsSuccess, fetchInterestsFailure, addInterestStart,
               addInterestSuccess, addInterestFailure, deleteInterestStart, deleteInterestSuccess, deleteInterestFailure } = interests.actions;
export default interests.reducer;