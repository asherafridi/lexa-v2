import Link from 'next/link'
import React from 'react'
import { LayoutGrid } from 'lucide-react';
import UserAccountMenu from './UserAccountMenu';
import { useSession } from 'next-auth/react';
import Breadcrumb from './Breadcrumb';

const Navbar = ({ sidebar, setSidebar }: { sidebar: any, setSidebar: any }) => {
  const session = useSession();
  return (
    <div className='px-2'>
      
      <div className='bg-white  border shadow-sm border-gray-300 p-3 px-6 w-full  rounded-lg  flex justify-between items-center lg:justify-between'>
      
      <div className='flex gap-4  lg:hidden'>
          <LayoutGrid className='' onClick={
            () => setSidebar(!sidebar)} />
          <Link href="/dashboard" className='text-lg'>LexaTalk</Link>
        </div>
        <Breadcrumb />
        <div>
          <UserAccountMenu />
        </div>

      </div>
      
    </div>
  )
}

export default Navbar