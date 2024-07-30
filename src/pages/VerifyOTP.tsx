import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authVerifyOTP, authResendOTP } from '@stores/AuthStores'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores'
import OtpInput from 'react-otp-input'
import { useEffect, useState, useRef, useCallback } from 'react'

export default function VerifyOTP () {
  const [otp, setOtp] = useState('')
  const [time, setTime] = useState(120); // 120 seconds for 2 minutes
  const timerIntervalRef = useRef<NodeJS.Timeout>();

  const navigate = useNavigate()

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { registerForm } = useSelector((state: RootState) => state.auth)

  const censorEmail = (email: string) => {
    if (!email) return ''

    const [localPart, domain] = email.split('@');

    const showLength = Math.min(3, localPart.length);

    const censoredLocalPart = localPart.substring(0, showLength) + '*'.repeat(localPart.length - showLength);

    return `${censoredLocalPart}@${domain}`;
  }

  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  const resetTimer = () => {
    dispatch(authResendOTP({ email: registerForm.email }))
      .then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          clearInterval(timerIntervalRef.current);
          setTime(120); // Reset to 120 seconds (2 minutes)
          startTimer();
        }
      })
  }

  // Format the time as MM:SS
  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  const handlerOtpComplete = useCallback(() => {
    if (otp.length === 4) {
      dispatch(authVerifyOTP({ email: registerForm.email, otp: otp }))
        .then(({ meta }) => {
          if (meta.requestStatus === 'fulfilled') {
            navigate('/setup-profile')
          }
        })
    }
  }, [otp, registerForm.email, navigate, dispatch])

  useEffect(() => {
    // Start the timer when the component mounts
    startTimer();

    handlerOtpComplete()

    // Cleanup interval on component unmount
    return () => clearInterval(timerIntervalRef.current);
  }, [registerForm, handlerOtpComplete])
  
  return (
    <motion.div   
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full gap-6 px-6"
    >
      <span className="text-2xl font-semibold">Verify OTP</span>
      
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm text-gray-500">We have sent the OTP Code to email {censorEmail(registerForm.email)}</span>
        
        <div className="otp-wrapper">
          <OtpInput
            inputStyle="otp-input"
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
            inputType="number"
          />
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-500">Haven&apos;t received the code?</span>
          { time > 0 ? 
            <span className="text-white">{formatTime(time)}</span> : 
            <span className="cursor-pointer text-primary" onClick={resetTimer}>Resend Code</span> 
          }
        </div>
      </div>
    </motion.div>
  )
}