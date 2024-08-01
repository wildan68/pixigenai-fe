import { configureStore } from '@reduxjs/toolkit'
import AuthStores from '@stores/AuthStores'
import UserStores from '@stores/UserStores'
import DiscoverStores from '@stores/DiscoverStores'

const store = configureStore({
  reducer: {
    auth: AuthStores,
    user: UserStores,
    discover: DiscoverStores
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;