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
        },
        deleteUserStart:(state)=>
        {
            state.loading =true
            state.error = null
        },
        deleteUserFailure:(state,action)=>
        {
            state.loading =true
            state.error = action.payload
          
        },
        deleteUserSuccess:(state)=>
        {
            state.currentUser = null
            state.loading =false
            state.error = null
        },
    }
})

export const {signInFailure,signInStart,signInSuccess,updateStart,updateSuccess,updateFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess} = userSlice.actions

export default userSlice.reducer