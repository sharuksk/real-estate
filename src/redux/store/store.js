import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";
import authReducers from "../slices/authSlices";
import userReducers from "../slices/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
};

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
});

const persistedUserReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedUserReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
