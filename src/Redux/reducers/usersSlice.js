// usersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from "../actions/usersActions";

const initialState = {
    users: [],
    loading: false,
    error: null,
};
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Define additional reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
