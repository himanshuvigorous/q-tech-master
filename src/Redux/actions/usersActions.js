// adminSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpGet } from '../services/userService';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (url, { rejectWithValue }) => {
        try {
            const response = await httpGet(url);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);




