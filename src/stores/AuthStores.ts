import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@axios'
import { toast } from 'react-toastify'

const authStores = createSlice({
  name: 'AuthStores',
  initialState: {
    loading: false,
    registerForm: {
      email: '',
      password: '',
      username: '',
      fullname: '',
    }
  },
  reducers: {
    setLoading (state, action) {
      state.loading = action.payload
    },
    setRegisterEmail (state, action) {
      state.registerForm.email = action.payload
    },
    setRegisterPassword (state, action) {
      state.registerForm.password = action.payload
    },
    setRegisterUsername (state, action) {
      state.registerForm.username = action.payload
    },
    setRegisterFullname (state, action) {
      state.registerForm.fullname = action.payload
    }
  },
});

export const { 
  setLoading, 
  setRegisterEmail,
  setRegisterPassword,
  setRegisterUsername,
  setRegisterFullname
} = authStores.actions;

export const authLogin = createAsyncThunk('AuthStores/authLogin', async ({ email, password }: { email: string, password: string }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 

      axios.post('/auth/login', { email, password })
        .then(({ data }) => {
          localStorage.setItem('token', data.data.token)
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

export const authRegister = createAsyncThunk('AuthStores/authRegister', async ({ email, password }: { email: string, password: string }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 

      axios.post('/auth/register', { email, password })
        .then(({ data }) => {
          thunkAPI.dispatch(setRegisterEmail(email))
          thunkAPI.dispatch(setRegisterPassword(password))

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

export const authVerifyOTP = createAsyncThunk('AuthStores/authVerifyOTP', async ({ email, otp }: { email: string, otp: string }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 

      axios.post('/auth/verify-otp', { email, otp })
        .then(({ data }) => {
          toast('Verification Successfully', { type: 'success' })

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

export const authResendOTP = createAsyncThunk('AuthStores/authResendOTP', async ({ email }: { email: string }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 

      axios.post('/auth/resend-otp', { email })
        .then(({ data }) => {
          toast('OTP has been sent', { type: 'success' })

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

export const authSetupProfile = createAsyncThunk('AuthStores/authSetupProfile', async ({ email, username, fullname }: { email: string, username: string, fullname: string }, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(setLoading(true)) 

      axios.post('/auth/setup-profile', { email, username, fullname })
        .then(({ data }) => {
          thunkAPI.dispatch(setRegisterUsername(username))
          thunkAPI.dispatch(setRegisterFullname(fullname))

          localStorage.setItem('token', data.data.token)

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

export const authLogout = createAsyncThunk('AuthStores/authLogout', async () => {
  try {
    return new Promise((resolve) => {
      localStorage.removeItem('token')

      return resolve(new Promise(() => {}))
    })
  }
  catch (error) {
    return error
  }
})

export default authStores.reducer;