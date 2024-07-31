import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from '@nextui-org/react'
import { TbMail } from 'react-icons/tb'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authForgotPassword } from '@stores/AuthStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';

export default function ForgotPassword ({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { isOpen, onOpen, onOpenChange, onClose: closeModal } = useDisclosure()

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading } = useSelector((state: RootState) => state.auth)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  })

  const { register, handleSubmit, formState, resetField } = useForm({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    if (open) onOpen()
  }, [open, onOpen])

  useEffect(() => {
    if (!isOpen) {
      onClose()
      resetField('email')
    }
  }, [isOpen, onClose, resetField])

  const forgotPasswordHandler = ({ email }: { email: string }) => {
    dispatch(authForgotPassword({ email }))
      .then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          closeModal()
        }
      })
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(forgotPasswordHandler)}>
              <ModalHeader className="flex flex-col gap-1">Forgot Password</ModalHeader>

              <ModalBody>
                <span className="text-xs text-gray-500">
                  We will send a link to your email to reset your account password.
                </span>
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
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button color="primary" type="submit" isLoading={loading}>
                  Send
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}