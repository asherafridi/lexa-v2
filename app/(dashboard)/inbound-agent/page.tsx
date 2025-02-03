"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useVectorFetch } from '@/hooks/vectorHook';
import { useInboundAgentsFetch } from '@/hooks/inboundAgentHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';



const Page = () => {
  const {vector, vectorLoader } = useInboundAgentsFetch();

  
  return (
    <div className=' min-h-screen'>
        <Card className="bg-white mt-4 p-4">
          {vectorLoader ?  <Skeleton className='w-full h-[400px] rounded mt-4'/> : <DataTable columns={columns} data={vector}  />}
        
        </Card>
    </div>
  )
}

export default Page