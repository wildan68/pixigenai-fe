import { configureStore } from '@reduxjs/toolkit'
import AuthStores from '@stores/AuthStores'

const store = configureStore({
  reducer: {
    auth: AuthStores
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;