import { Avatar, Button } from '@nextui-org/react';
import { ReactSVG } from 'react-svg';
import Coin from '@assets/svg/coin.svg'
import { TbBell } from 'react-icons/tb';

export default function Navbar () {
  return (
    <div className="sticky top-0 px-6 py-3 border-b-[3px] border-b-bases bg-background flex justify-end items-center gap-6">
      <Button isIconOnly variant="light">
        <TbBell className='w-6 h-6'/>
      </Button>


      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-1">
          <span className="text-base">Leixy</span>

          <div className="flex items-center gap-1">
            <ReactSVG src={Coin}/>

            <span>2.500</span>
          </div>
        </div>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </div>
    </div>
  )
}