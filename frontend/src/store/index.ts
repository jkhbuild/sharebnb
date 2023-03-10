import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "redux"

import session from "./session";

const isDev = process.env.NODE_ENV !== "production"

const rootReducer = combineReducers({})

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    devTools: isDev,
    middleware: (getDefaultMiddleware) => {
        if (isDev) {
            const logger = require("redux-logger").default;
            return getDefaultMiddleware().concat(
                logger as Middleware<any, RootState>
            )
        }
        return getDefaultMiddleware()
    },
    reducer: rootReducer
})
export default store;