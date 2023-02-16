import csrfFetch from "./csrf.js";
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


export const signup = (data: SignUpType) => async(dispatch) => {
    const { email, password, firstName, lastName, birthDate, phoneNumber } = data
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName
        })

    })

}

// export async function signup(data: SignUpType) {
//     return fetchAPI(authRoute("/signup"), {
//         method: "POST",
//         body: JSON.stringify(data)
//     })
// }

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