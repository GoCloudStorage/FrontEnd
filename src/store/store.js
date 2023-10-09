import userReducer from './user/UserSlice'
import {configureStore} from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        user: userReducer
    }
})