import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: { general: {} },
    reducers: {
        updateGeneralSettings(state, action) {
            state.general = { ...state.general, ...action.payload };
        },
    },
});

export const { updateGeneralSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
