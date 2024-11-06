"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useVectorFetch } from '@/hooks/vectorHook';
import { Skeleton } from '@/components/ui/skeleton';



const Page = () => {
  const {vector, vectorLoader } = useVectorFetch();

  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Company Informations" />
        <div className="bg-background border mt-4 rounded p-4">
          {vectorLoader ?  <Skeleton className='w-full h-[400px] rounded mt-4'/> : <DataTable columns={columns} data={vector}  />}
        
        </div>
    </div>
  )
}

export default Page