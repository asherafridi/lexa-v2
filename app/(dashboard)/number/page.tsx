"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useNumberFetch } from '@/hooks/numberHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';


const Page = () => {
  const {number,numberLoader} = useNumberFetch();

  
  return (
        <Card className="p-4 pt-0 mt-5">
          {numberLoader ?  <Skeleton className='w-full h-[400px] rounded mt-4'/> : <DataTable columns={columns} data={number}  />}
        
        </Card>
  )
}

export default Page