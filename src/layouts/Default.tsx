import { Outlet } from 'react-router-dom';
import Sidebar from '@layouts/components/Sidebar';
import Navbar from '@layouts/components/Navbar';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import type { RootState } from '@/stores';

export default function DefaultLayout () {
  const [sidebarWidth] = useState(250)

  const { authenticated } = useSelector((state: RootState) => state.auth)

  if (!authenticated) return null

  return (
    <>
      <div className='min-h-screen'>
        <Sidebar sidebarWidth={sidebarWidth}/>
        
        <div 
          className='flex flex-col w-auto'
          style={{ marginLeft: sidebarWidth }}
        >
          <Navbar/>

          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}