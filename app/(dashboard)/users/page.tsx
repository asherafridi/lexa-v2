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
import { Card } from '@/components/ui/card';
import { useAllUserFetch } from '@/hooks/userHook';



const Page = () => {
  const {users, userLoader} = useAllUserFetch();

  if(userLoader){
    return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
  }
  
  return (
        <Card className="p-4 pt-0">
          <DataTable columns={columns} data={users}  />
        </Card>
  )
}

export default Page