import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-4 flex items-center justify-between'>
      <Image src={'/logo.png'} alt='clipcraft-logo-image' width={200} height={200} />
      <Button className='cursor-pointer'>Get Started</Button>
    </div>
  )
}

export default Header