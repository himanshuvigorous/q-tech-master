// reducers/index.js
import { combineReducers } from "redux";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    users: usersSlice,
});

export default rootReducer;
