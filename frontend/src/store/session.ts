import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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

const userSlice = createSlice({
    name: "session",
    initialState: initialState as UserType
})