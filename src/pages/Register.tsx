import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TbEye, TbEyeOff, TbLock, TbMail } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register () {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  return (
    <motion.div   
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full gap-6 px-6"
    >
      <span className="text-2xl font-semibold">Sign Up</span>

      <div className="flex flex-col gap-4">
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
        />

        <Button
          color="primary"
          size="lg"
          onClick={() => navigate('/')}
        >
          Sign Up
        </Button>

        <div className="flex items-center justify-center gap-2">
          <div className="bg-gray-700 h-[1px] flex-1"/>
          <span className="text-xs text-gray-500">Don't have an account yet?</span>
          <div className="bg-gray-700  h-[1px] flex-1"/>
        </div>

        <Button
          color="primary"
          variant="bordered"
          size="lg"
          onClick={() => navigate('/auth/login')}
        >
          Sign In
        </Button>

        <Button
          color="default"
          variant="bordered"
          size="lg"
        >
          <FcGoogle/>
          Sign in with Google
        </Button>
      </div>
    </motion.div>
  )
}