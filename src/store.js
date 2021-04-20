import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from './module/slice/user'

export const Store = configureStore({
    reducer: {
        user: UserReducer
    }
})