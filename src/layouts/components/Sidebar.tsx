import Logo from '@assets/svg/logo.svg'
import { ISideBarItem } from '@/types'
import { useEffect, useState } from 'react'
import { Listbox, ListboxItem } from "@nextui-org/react";
import { TbLayoutDashboard, TbCompass, TbPhotoSearch, TbBookmarks, TbSparkles, TbPaint, TbPhotoSquareRounded, TbCreditCard, TbSettings } from 'react-icons/tb';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

export default function Sidebar ({ sidebarWidth = 250 }: { sidebarWidth?: number }) {
  const sidebarItems: ISideBarItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <TbLayoutDashboard />,
    }, {
      key: 'discover',
      label: 'Discover',
      icon: <TbCompass />,
    }, {
      key: 'search',
      label: 'Search',
      icon: <TbPhotoSearch />,
    }, {
      key: 'bookmarks',
      label: 'Bookmarks',
      icon: <TbBookmarks />,
    }, {
      key: 'manual-generate',
      label: 'Manual Generate',
      icon: <TbSparkles />,
    }, {
      key: 'drawing',
      label: 'Drawing',
      icon: <TbPaint />,
    }, {
      key: 'my-catalog',
      label: 'My Catalog',
      icon: <TbPhotoSquareRounded />,
    }, {
      key: 'divider',
    }, {
      key: 'my-balance',
      label: 'My Balance',
      icon: <TbCreditCard />,
    }, {
      key: 'settings',
      label: 'Settings',
      icon: <TbSettings />,
    },
  ]

  const route = useLocation() 
  const navigate = useNavigate()
  const [activePath, setActivePath] = useState(route.pathname)

  useEffect(() => {
    setActivePath(route.pathname)
  }, [route])

  return (
    <div 
      className='fixed top-0 bottom-0 left-0 flex flex-col items-center gap-6 py-6 bg-bases'
      style={{ width: sidebarWidth }}
    >
      <ReactSVG 
        src={Logo}  
        beforeInjection={(svg) => {
          svg.classList.add('svg-class-name')
          svg.setAttribute('style', 'width: 145px; height: fit-content')
        }}/>

      <div className='w-full px-3'>
        <Listbox 
          items={sidebarItems}
          itemClasses={{
            base: `p-3`,
          }}
          onAction={(key) => navigate(key as string)}
          variant='light'
          disabledKeys={['divider']}
        >
          {(item) => (
            <ListboxItem 
              key={item.key} 
              startContent={
                <div className={`p-1 rounded-md ${activePath.includes(item.key) ? 'bg-primary/10' : 'bg-foreground/10'}`}>
                  {item.icon}
                </div>
              }
              color={activePath.includes(item.key) ? 'primary' : 'default'}
              className={activePath.includes(item.key) ? 'text-primary' : ''}
            >
              <span className='text-base'>
                {item.label}
              </span>
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </div>
  )
}