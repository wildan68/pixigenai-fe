import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { TbEye, TbEyeOff, TbLock, TbMail } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from '@stores/AuthStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SignWithGoogle from '@/components/SignWithGoogle';

export default function Register () {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading } = useSelector((state: RootState) => state.auth)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const registerHandler = ({ email, password }: { email: string, password: string }) => {
    dispatch(authRegister({ email, password }))
      .then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          navigate('/verify-otp')
        }
      })
  }

  return (
    <motion.div   
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full gap-6 px-6"
    >
      <span className="text-2xl font-semibold">Sign Up</span>

      <form 
        className="flex flex-col gap-4" 
        onSubmit={handleSubmit(registerHandler)}
      >
        <Input 
          label="Email" 
          variant="bordered" 
          color="primary"
          classNames={{
            label: 'text-foreground',
          }}
          startContent={<TbMail/>}
          placeholder="Input email"
          isRequired
          isInvalid={!!formState.errors.email}
          errorMessage={formState.errors.email?.message}
          {...register('email')}
        />

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
          Sign Up
        </Button>

        <div className="flex items-center justify-center gap-2">
          <div className="bg-gray-700 h-[1px] flex-1"/>
          <span className="text-xs text-gray-500">Already have an account?</span>
          <div className="bg-gray-700  h-[1px] flex-1"/>
        </div>

        <Button
          color="primary"
          variant="bordered"
          size="lg"
          onClick={() => navigate('/login')}
        >
          Sign In
        </Button>

        <SignWithGoogle />
      </form>
    </motion.div>
  )
}