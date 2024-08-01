import { Spinner } from '@nextui-org/react';

export default function PageLoader () {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Spinner color="primary" size="lg" />
    </div>
  )
}