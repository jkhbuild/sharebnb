import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface SessionData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    phoneNumber: string;
}

const userSlice = createSlice({
    name: "session",
    initialState: initialState as SessionData
})