import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "redux"

const rootReducer = combineReducers({})

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
})
export default store;