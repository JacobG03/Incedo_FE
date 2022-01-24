import { createSlice } from '@reduxjs/toolkit'
import { IAlert } from '../../types';


export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [] as IAlert[]
  },
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push(action.payload)
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.message !== action.payload.message)
    }
  }
})


export const { addAlert, removeAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
