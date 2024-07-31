import { motion } from 'framer-motion'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authResetPasswordChecker, authResetPassword } from '@stores/AuthStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { TbLock, TbEye, TbEyeOff } from 'react-icons/tb';

export default function ResetPassword () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') as string
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading } = useSelector((state: RootState) => state.auth)

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const resetPasswordHandler = ({ password }: { password: string }) => {
    dispatch(authResetPassword({ token, password }))
      .then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          return navigate('/login')
        }
      })
  }


  const resetPasswordChecker = useCallback(() => {
    dispatch(authResetPasswordChecker({ token }))
      .then(({ meta }) => {
        console.log(meta)
        if (meta.requestStatus === 'rejected') {
          return navigate('/login')
        }
      })
  }, [dispatch, token, navigate])

  useEffect(() => {
    resetPasswordChecker()
  }, [resetPasswordChecker])

  if (!token) return <Navigate to="/login" />

  return (
    <motion.div   
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full gap-6 px-6"
    >
      <span className="text-2xl font-semibold">Reset Password</span>

      <form 
        className="flex flex-col gap-4" 
        onSubmit={handleSubmit(resetPasswordHandler)}
      >
        <Input 
          label="Password"
          variant="bordered" 
          color="primary"
          classNames={{
            label: 'text-foreground',
          }}
          startContent={<TbLock/>}
          placeholder="Input password"
          endContent={
            <Button 
              onClick={toggleVisibility}
              variant='light'
              isIconOnly
            >
              {isVisible ? (
                <TbEye/>
              ) : (
                <TbEyeOff/>
              )}
            </Button>
          }
          type={isVisible ? "text" : "password"}
          isRequired
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password?.message}
          {...register('password')}
        />

        
        <Input 
          label="Confirm Password"
          variant="bordered" 
          color="primary"
          classNames={{
            label: 'text-foreground',
          }}
          startContent={<TbLock/>}
          placeholder="Input confirm password"
          endContent={
            <Button 
              onClick={toggleVisibilityConfirm}
              variant='light'
              isIconOnly
            >
              {isVisibleConfirm ? (
                <TbEye/>
              ) : (
                <TbEyeOff/>
              )}
            </Button>
          }
          type={isVisibleConfirm ? "text" : "password"}
          isRequired
          isInvalid={!!formState.errors.confirm_password}
          errorMessage={formState.errors.confirm_password?.message}
          {...register('confirm_password')}
        />

        <Button
          color="primary"
          size="lg"
          type="submit"
          isLoading={loading}
        >
          Reset Password
        </Button>

      </form>
    </motion.div>
  )
}