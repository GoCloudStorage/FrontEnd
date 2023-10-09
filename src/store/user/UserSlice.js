import {createSlice} from '@reduxjs/toolkit'
import {userAPI} from "../../service/user/user";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            token: "",
            phone: "",
            email: "",
            username: "",
        },
    },
    reducers: {
        userLoaded: (state, action) => {
            let data = action.payload.data
            state.value.token = data.token
            state.value.phone = data.phone
            state.value.email = data.email
            state.value.username = data.username
        }
    }
})

export const login = (phone, password) => {
    return (dispatch, getState) => {
        userAPI.login(phone, password).then(data => {
            dispatch(userLoaded(data))
        }).catch(err => {
            console.log(err)
        })

    }
}

export const {userLoaded} = userSlice.actions

export const selectUser = state => state.user.value

export default userSlice.reducer