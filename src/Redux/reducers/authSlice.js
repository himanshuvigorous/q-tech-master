// import { createSlice } from "@reduxjs/toolkit";

// import { loginUser, logoutUser, editUser, deleteUser } from "../actions/authActions";

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         token: localStorage.getItem("token") || null,
//         user: JSON.parse(localStorage.getItem("user")) || null,
//         authenticate: false,
//         authenticating: false,
//         loading: false,
//         error: null,
//         message: null,
//     },
//     reducers: {
//         // additional synchronous reducers can go here if needed
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.authenticating = true;

//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 const { token, user } = action.payload;
//                 state.user = user;
//                 state.token = token;
//                 state.authenticate = true;
//                 state.authenticating = false;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(logoutUser.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(logoutUser.fulfilled, (state) => {
//                 state.loading = false;
//                 state.authenticate = false;
//                 state.token = null;
//                 state.user = null;
//             })
//             .addCase(logoutUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(editUser.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(editUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // Handle edit user success if needed
//             })
//             .addCase(editUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;

//             })
//             .addCase(deleteUser.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(deleteUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // Handle delete user success if needed
//             })
//             .addCase(deleteUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

import { loginUser, logoutUser, editUser, deleteUser } from "../actions/authActions";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
        authenticate: false,
        authenticating: false,
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        // additional synchronous reducers can go here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.authenticating = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("action.payload",action.payload);
                const { token, user } = action.payload;
                state.user = user;
                state.token = token;
                state.authenticate = true;
                state.authenticating = false;

                // Set localStorage values
                localStorage.setItem("token", action.payload.data.token);
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.authenticate = false;
                state.token = null;
                state.user = null;

                // Clear localStorage values
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                // Handle edit user success if needed

                // Update user in localStorage
                // localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                // Handle delete user success if needed

                // Clear user from localStorage
                localStorage.removeItem("user");
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
