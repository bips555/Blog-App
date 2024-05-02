import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user/userSlice.js";
import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from './Theme/themeSlice.js'

const rootReducer = combineReducers({
    user:UserReducer,
    theme:themeReducer
})
const persistConfig = {
    key: 'root',
    storage,
    version : 1,
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck:false})
});

export const persistor = persistStore(store)