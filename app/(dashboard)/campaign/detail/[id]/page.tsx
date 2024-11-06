"use client"
import Breadcrumb from '@/components/Breadcrumb';
import React, { useEffect, useState } from 'react'
import { useFetchCall } from '@/hooks/singleCallHook';
import { useFetchCampaign } from '@/hooks/campaignHook';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CalendarPlus, CreditCard, DollarSign, Headset, Phone, PhoneCall, PhoneOutgoing, Users } from 'lucide-react';
import { DataTable } from '@/app/(dashboard)/campaign/detail/data-table';
import { columns } from '@/app/(dashboard)/campaign/detail/columns';
import { Skeleton } from '@/components/ui/skeleton';



const Page = ({ params }: { params: { id: string } }) => {
    const { batches, batchLoader } = useFetchCampaign(params.id);


    if (batchLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }

    console.log(batches);


    return (
        <div className='p-5 min-h-screen'>
            <Breadcrumb title={`${batches?.batch_params.label} - Campaign Detail`} />

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Calls
                        </CardTitle>
                        <PhoneCall className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{batches?.analysis?.total_calls}</div>
                        <p className="text-xs text-muted-foreground">
                            Calls
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Completed Calls
                        </CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{batches?.analysis?.completed_calls}</div>
                        <p className="text-xs text-muted-foreground">
                            Calls
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inprogress Calls</CardTitle>
                        <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{batches?.analysis?.in_progress_calls}</div>
                        <p className="text-xs text-muted-foreground">
                            Calls
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Call Length Avg</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{batches?.analysis.call_lengths.average}</div>
                        <p className="text-xs text-muted-foreground">
                            Sec
                        </p>
                    </CardContent>
                </Card>
            </div>

            
            <Card className='mt-4'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Base Prompt
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">
                        {batches?.batch_params?.base_prompt}
                        </p>
                    </CardContent>
            </Card>

            <div className="bg-background border mt-4 rounded p-4">

            <DataTable columns={columns} data={batches?.call_data} />
            </div>
        </div>
    )
}

export default Page