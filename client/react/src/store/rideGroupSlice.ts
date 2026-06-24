import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RideGroup } from '../types/rideGroup';
import { getErrorMessage } from '../utils/errorMessage';
import { apiUrl } from '../utils/api';

interface RideGroupsState {
  groups: RideGroup[];
  loading: boolean;
  error: string | null;
}


const initialState: RideGroupsState = {
  groups: [],
  loading: false,
  error: null,
};

export const fetchRideGroups = createAsyncThunk(
  'rideGroups/fetch',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(apiUrl('/rideGroup/'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data as RideGroup[];
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, 'Error loading groups.'));
    }
  }
);

const rideGroupsSlice = createSlice({
  name: 'rideGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRideGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRideGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchRideGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Error loading groups.';
      });
  },
});

export default rideGroupsSlice.reducer;
