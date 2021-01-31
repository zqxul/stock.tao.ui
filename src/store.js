import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from './module/user/slice'

export const Store = configureStore({
    reducer: {
        user: UserReducer
    }
})