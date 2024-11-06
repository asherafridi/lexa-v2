"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAllContactFetch } from '@/hooks/contactHook';
import { Skeleton } from '@/components/ui/skeleton';



const Page = () => {
  const {contact, contactLoader} = useAllContactFetch();

  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Contacts" />
        <div className="bg-background border mt-4 rounded p-4">
          {contactLoader ?  <Skeleton className='w-full h-[400px] rounded mt-4'/> : <DataTable columns={columns} data={contact}  />}
        
        </div>
    </div>
  )
}

export default Page