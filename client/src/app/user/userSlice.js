import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser:null,
    error:null,
    loading :false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>
        {
            state.loading = true,
            state.error = null
        },
        signInSuccess:(state,action)=>
        {
            state.currentUser = action.payload
            state.loading= false
        },
        signInFailure:(state,action)=>
        {
            state.loading = false
            state.error = action.payload
        },
        updateStart:(state,action)=>
        {
            state.loading = true
            state.error = null
        },
        updateFailure:(action,state)=>
        {
            state.loading = false,
            state.error =action.payload
        },
        updateSuccess:(state,action)=>
        {
            state.loading = false
            state.currentUser = action.payload
        }
    }
})

export const {signInFailure,signInStart,signInSuccess,updateStart,updateSuccess,updateFailure} = userSlice.actions

export default userSlice.reducer