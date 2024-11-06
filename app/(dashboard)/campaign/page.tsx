"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useAllCallFetch } from '@/hooks/singleCallHook';
import { useAllCampaignFetch } from '@/hooks/campaignHook';

const Page = () => {
  const { campaignData,campaignLoading } = useAllCampaignFetch();

  return (
    <div className='p-5 min-h-screen'>
      <Breadcrumb title="Campaign" />
        {campaignLoading ? (
          <Skeleton className='w-full h-[400px] rounded mt-4'/>
        ) : (
          <div className="bg-background border mt-4 rounded p-4">
          <DataTable columns={columns} data={campaignData} />
          </div>
        )}
    </div>
  );
};

export default Page;
