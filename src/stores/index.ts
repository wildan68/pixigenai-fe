import { configureStore } from '@reduxjs/toolkit'
import AuthStores from '@stores/AuthStores'
import UserStores from '@stores/UserStores'

const store = configureStore({
  reducer: {
    auth: AuthStores,
    user: UserStores
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;