import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TbEye, TbEyeOff, TbLock, TbMail } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '@stores/AuthStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Login () {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible);

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading } = useSelector((state: RootState) => state.auth)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is required'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const loginHandler = ({ email, password }: { email: string, password: string }) => {
    dispatch(authLogin({ email, password }))
      .then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          window.open('/dashboard', '_self')
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
      <span className="text-2xl font-semibold">Sign In</span>

      <form 
        className="flex flex-col gap-4" 
        onSubmit={handleSubmit(loginHandler)}
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
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password?.message}
          {...register('password')}
        />

        <Button
          color="primary"
          size="lg"
          isLoading={loading}
          type="submit"
        >
          Sign In
        </Button>

        <div className="flex items-center justify-center gap-2">
          <div className="bg-gray-700 h-[1px] flex-1"/>
          <span className="text-xs text-gray-500">Don&apos;t have an account yet?</span>
          <div className="bg-gray-700  h-[1px] flex-1"/>
        </div>

        <Button
          color="primary"
          variant="bordered"
          size="lg"
          onClick={() => navigate('/auth/register')}
        >
          Sign Up
        </Button>

        <Button
          color="default"
          variant="bordered"
          size="lg"
        >
          <FcGoogle/>
          Sign in with Google
        </Button>
      </form>
    </motion.div>
  )
}