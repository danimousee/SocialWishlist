import { configureStore } from "@reduxjs/toolkit";
import { platosApi } from "./service/platos";

export const store = configureStore ({
    reducer: {
        [platosApi.reducerPath]: platosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(platosApi.middleware);
      },
})
