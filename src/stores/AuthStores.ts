import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@axios'
import { toast } from 'react-toastify'

const authStores = createSlice({
  name: 'AuthStore',
  initialState: {
    loading: false,
    user: null
  },
  reducers: {
    setLoading (state, action) {
      state.loading = action.payload
    },
    setUser (state, action) {
      state.user = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(authLogin.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(authLogin.rejected, (state) => {
        state.loading = false
      })
  }
});

export const { setLoading, setUser } = authStores.actions;

export const authLogin = createAsyncThunk('AuthStore/authLogin', async ({ email, password }: { email: string, password: string }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      // thunkAPI.dispatch(authStores.actions.setLoading(true)) 

      axios.post('/auth/login', { email, password })
        .then(({ data }) => {
          thunkAPI.dispatch(authStores.actions.setUser(data.data))
          localStorage.setItem('token', data.data.token)
          return resolve(data)
        })
        .catch((err) => {
          toast(err.response.data.message, { type: 'error' })
          return reject(err)
        })
    // .finally(() => thunkAPI.dispatch(authStores.actions.setLoading(false)))
    })
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export default authStores.reducer;