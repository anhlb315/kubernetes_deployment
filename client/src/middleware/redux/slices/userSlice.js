import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

const {setUser} = userSlice.actions;

export const setUserAction = setUser;

export default userSlice.reducer;
