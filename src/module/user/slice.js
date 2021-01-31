import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        info: null
    },
    reducers: {
        save: (state, action) => {
            state.info = action.payload
        },
        refresh: (state, action) => {
            state.info = action.payload
        },
        clear: (state, action) => {
            if (state.info) {
                state.info = null
            }
        }
    }
})
export const { save, refresh, clear } = UserSlice.actions
export const UserReducer = UserSlice.reducer