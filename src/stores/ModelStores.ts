import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@axios'
import { toast } from 'react-toastify'

const modelStores = createSlice({
  name: 'ModelStores',
  initialState: {
    loading: false,
    error: false
  },
  reducers: {
    setLoading (state, action) {
      state.loading = action.payload
    },
    setError (state, action) {
      state.error = action.payload
    }
  }
})

export const { 
  setLoading,
  setError
} = modelStores.actions

export const getModels = createAsyncThunk('ModelStores/getModels', async (_, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 
      thunkAPI.dispatch(setError(false))

      axios.get('/models')
        .then(({ data }) => {
          return resolve(data)
        })
        .catch((err) => {
          toast(err.response.data.message, { type: 'error' })
          thunkAPI.dispatch(setError(true))
          return reject(err)
        })
        .finally(() => thunkAPI.dispatch(setLoading(false)))
    })
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export default modelStores.reducer