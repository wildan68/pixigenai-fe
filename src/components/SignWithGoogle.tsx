import { Button } from '@nextui-org/react'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin  } from '@react-oauth/google'
import axios from '@axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores'
import { useDispatch } from 'react-redux'
import { setRegisterEmail, setRegisterFullname } from '@/stores/AuthStores'

export default function SignWithGoogle () {
  const navigate = useNavigate()

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      return axios.post('/auth/google', { access_token: tokenResponse.access_token })
        .then(({ data }) => {
          if (!data.data.registered) {
            dispatch(setRegisterEmail(data.data.email))
            dispatch(setRegisterFullname(data.data.fullname))

            return navigate('/setup-profile')
          }

          localStorage.setItem('token', data.data.token)
          return window.open('/dashboard', '_self')
        })
    },
    onError: errorResponse => toast(errorResponse.error_description, { type: 'error' }),
  });

  return (
    <Button
      color="default"
      variant="bordered"
      size="lg"
      onClick={() => googleLogin()}
    >
      <FcGoogle/>
      Sign in with Google
    </Button>
  )
}