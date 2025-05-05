import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8010/api/simulator';

export const fetchStatus = createAsyncThunk('simulator/fetchStatus', async () => {
  const response = await axios.get(`${BASE_URL}/status`);
  return response.data;
});

export const startSimulator = createAsyncThunk('simulator/startSimulator', async () => {
  const response = await axios.post(`${BASE_URL}/start`);
  return response.data;
});

export const stopSimulator = createAsyncThunk('simulator/stopSimulator', async () => {
  const response = await axios.post(`${BASE_URL}/stop`);
  return response.data;
});

const simulatorSlice = createSlice({
  name: 'simulator',
  initialState: {
    running: false,
    sensorCount: 0,
    sensors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.pending, (state) => { state.loading = true; })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.running = action.payload.running;
        state.sensorCount = action.payload.sensorCount;
        state.sensors = action.payload.sensors;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(startSimulator.fulfilled, (state) => {
        state.running = true;
      })
      .addCase(stopSimulator.fulfilled, (state) => {
        state.running = false;
      });
  },
});

export default simulatorSlice.reducer;
