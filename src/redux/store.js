import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import blogReducer from "./slice/blogSlice";

export const store = configureStore({
    reducer:{
        user : userReducer,
        blog : blogReducer,
    }
})