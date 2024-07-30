import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@axios'
import { toast } from 'react-toastify'

const userStores = createSlice({
  name: 'UserStores',
  initialState: {
    user: {
      fullname: '',
      balance: 0,
    },
    loading: false
  },
  reducers: {
    setLoading (state, action) {
      state.loading = action.payload
    },
    setUser (state, action) {
      state.user = action.payload
    }
  }
})

export const { 
  setUser,
  setLoading
} = userStores.actions

export const userProfile = createAsyncThunk('UserStores/userProfile', async ({ id }: { id?: string | null }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 

      const path = id ? `/user/profile/${id}` : '/user/profile'

      axios.get(path)
        .then(({ data }) => {
          if (!id) {
            thunkAPI.dispatch(setUser(data.data))
          }

          return resolve(data)
        })
        .catch((err) => {
          toast(err.response.data.message, { type: 'error' })
          return reject(err)
        })
        .finally(() => thunkAPI.dispatch(setLoading(false)))
    })
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export default userStores.reducer