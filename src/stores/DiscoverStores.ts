import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@axios'
import { toast } from 'react-toastify'

const discoverStores = createSlice({
  name: 'DiscoverStores',
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
} = discoverStores.actions

export const getDiscover = createAsyncThunk('DiscoverStores/getDiscover', async ({ 
  page,
  per_page,
  query
}: {
  page?: number
  per_page?: number
  query?: string
}, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 
      thunkAPI.dispatch(setError(false))

      axios.get('/discover', { params: {
        page,
        per_page,
        query
      } })
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

export default discoverStores.reducer