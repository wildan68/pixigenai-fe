import { Avatar, Button, Popover, PopoverTrigger, PopoverContent, Divider, Listbox, ListboxItem } from '@nextui-org/react'
import { ReactSVG } from 'react-svg'
import Coin from '@assets/svg/coin.svg'
import { TbBell, TbLogout, TbSettings } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from '@stores/AuthStores'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores'
import { numberFormat } from '@/utils/helper'

export default function Navbar () {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { user } = useSelector((state: RootState) => state.user)

  const logoutHandler = () => {
    dispatch(authLogout())

    window.open('/', '_self')
  }

  return (
    <div className="sticky top-0 px-6 py-3 border-b-[3px] border-b-bases bg-background flex justify-end items-center gap-6">
      <Button isIconOnly variant="light">
        <TbBell className='w-6 h-6'/>
      </Button>


      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm">{user.fullname}</span>

          <div className="flex items-center gap-1">
            <ReactSVG src={Coin}/>

            <span>{numberFormat(user.balance)}</span>
          </div>
        </div>

        <Popover placement="bottom">
          <PopoverTrigger>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </PopoverTrigger>

          <PopoverContent>
            <div className="flex flex-col gap-4 px-1 py-2 min-w-[250px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-small">{user.fullname}</span>

                    <div className="flex items-center gap-1">
                      <ReactSVG src={Coin}/>

                      <span>{numberFormat(user.balance)}</span>
                    </div>
                  </div>
                </div>

                <Button isIconOnly variant="light">
                  <TbSettings/>
                </Button>
              </div>

              <Divider/>

              <Listbox variant="faded" color="danger">
                <ListboxItem
                  key="new"
                  startContent={<TbLogout />}
                  className="text-danger"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </ListboxItem>
              </Listbox>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}