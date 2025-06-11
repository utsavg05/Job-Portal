import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.MODE === "development" ? "https://jobseek-ete7.onrender.com/" : "/";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setLoading, setUser} = authSlice.actions
export default authSlice.reducer