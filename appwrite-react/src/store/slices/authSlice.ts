import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action)=>{
            state.status = true,
            // state.userData = action.payload //as userData and the user object are the same, we can just write userData.
            state.userData = action.payload.userData
        },
        logout: (state)=>{
            state.status = false,
            state.userData = null
        }
    }
})

//exporting separate actions done as different functions can get the information about the state and can dispatch actions.
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;