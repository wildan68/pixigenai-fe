import { Button } from '@nextui-org/react';

export default function SomethingIsWrong () {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="text-3xl font-bold">Something is wrong</span>

        <Button color="primary" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  )
}