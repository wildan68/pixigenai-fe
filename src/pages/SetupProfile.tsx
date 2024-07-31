import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { authSetupProfile } from '@stores/AuthStores'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Button, Input } from '@nextui-org/react'

export default function SetupProfile () {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading, registerForm } = useSelector((state: RootState) => state.auth)

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(6, 'Must be 6 characters or more').required('Username is required'),
    fullname: Yup.string().min(1, 'Must be 1 characters or more').required('Fullname is required'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const setupProfileHandler = ({ username, fullname }: { username: string, fullname: string }) => {
    dispatch(authSetupProfile({ email: registerForm.email, username, fullname }))
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
      <span className="text-2xl font-semibold">Setup Profile</span>

      <form 
        className="flex flex-col gap-4" 
        onSubmit={handleSubmit(setupProfileHandler)}
      >
        <Input 
          label="Username" 
          variant="bordered" 
          color="primary"
          classNames={{
            label: 'text-foreground',
          }}
          isRequired
          isInvalid={!!formState.errors.username}
          errorMessage={formState.errors.username?.message}
          {...register('username')}
        />

        <Input 
          label="Fullname" 
          variant="bordered" 
          color="primary"
          classNames={{
            label: 'text-foreground',
          }}
          isRequired
          isInvalid={!!formState.errors.fullname}
          errorMessage={formState.errors.fullname?.message}
          value={registerForm.fullname}
          {...register('fullname')}
        />

        <Button
          color="primary"
          size="lg"
          type="submit"
          isLoading={loading}
        >
          Save Profile
        </Button>
      </form>
    </motion.div>
  )
}