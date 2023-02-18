import csrfFetch from "./csrf";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RequestOptions } from "https";

interface UserType {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    phoneNumber: string;
}

interface SignUpType {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    phoneNumber: string;
}

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser"

export const setCurrentUser = (user: UserType) => ({
    type: SET_CURRENT_USER,
    payload: user,
})

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER,
})

const storeCSRFToken = (response: Response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-TOKEN", csrfToken)
}

const storeCurrentUser = (user: object) => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser")
}


export const signup = (data: SignUpType) => async(dispatch: any) => {
    const { email, password, firstName, lastName, birthDate, phoneNumber } = data
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            birthDate,
            phoneNumber
        })
    })
    const userData = await response.json();
    storeCurrentUser(userData.user)
    dispatch(setCurrentUser(userData.user))
}


export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (data: SignUpType, thunkAPI): Promise<UserType> => {
        let res: Response;
        try {
            res = await signup(data);
        } catch (errorRes) {
            const resData = await (errorRes as Response).json();
            throw thunkAPI.rejectWithValue(resData.errors);
        }
        const user: UserType = await res.json();
        return user;
    }
)

const userSlice = createSlice({
    name: "session",
    initialState: initialState as UserType | null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.fulfilled, (_state, action) => {
            return action.payload;
        })
    }
})