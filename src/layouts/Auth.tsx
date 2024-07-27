import { Outlet } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Logo from '@assets/svg/logo.svg'

export default function Auth () {
  return (
    <div className='flex min-h-screen'>
      <div className='flex items-center justify-center flex-1'>
        <ReactSVG src={Logo}/>
      </div>

      <div className='w-[560px] bg-bases min-h-full flex justify-center items-center p-12'>
        <Outlet/>
      </div>
    </div>
  )
}