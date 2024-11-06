"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import Filter from './Filter';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useAllCallFetch } from '@/hooks/singleCallHook';

const Page = () => {
  const params = useSearchParams();
  const call_type = params.get('call_type');
  const batch = params.get('batch');
  const start_date = params.get('start_date');
  const end_date = params.get('end_date');

  const queryParams = {
    inbound: call_type || '',
    batch: batch || '',
    start_date: start_date || '',
    end_date: end_date || '',
  };

  console.log(queryParams);
  const { call, callLoader } = useAllCallFetch(queryParams);

  return (
    <div className='p-5 min-h-screen'>
      <Breadcrumb title="Calls" />
      <Filter />
        {callLoader ? (
          <Skeleton className='w-full h-[400px] rounded mt-4'/>
        ) : (
          <div className="bg-background border mt-4 rounded p-4">
          <DataTable columns={columns} data={call} />
          </div>
        )}
    </div>
  );
};

export default Page;
