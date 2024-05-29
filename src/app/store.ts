import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

// get type of our store variable
export type AppStore = typeof store;

// infer RootState and AppDispatch types from store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
