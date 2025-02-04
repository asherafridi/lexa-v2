"use client"
import Breadcrumb from '@/components/Breadcrumb';
import React, { useEffect, useState } from 'react'
import { useFetchCall } from '@/hooks/singleCallHook';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Phone, PhoneCall, PhoneOutgoing, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';



const Page = ({ params }: { params: { id: string } }) => {
    const { call, callLoader } = useFetchCall(params.id);

    console.log(call);
    if (callLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }


    return (


        <div className='p-5 min-h-screen'>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
                <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            From
                        </CardTitle>
                        <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{call?.from}</div>
                        <p className="text-xs text-muted-foreground">
                            Phone Number
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            To
                        </CardTitle>
                        <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{call?.to}</div>
                        <p className="text-xs text-muted-foreground">
                            Phone Number
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                        <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">{call?.status}</div>
                        <p className="text-xs text-muted-foreground">
                            Info
                        </p>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Call Length</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{call?.call_length}</div>
                        <p className="text-xs text-muted-foreground">
                            Minutes
                        </p>
                    </CardContent>
                </Card>
            </div>


            <Card className='mt-4'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {call?.summary}
                    </p>
                </CardContent>
            </Card>

            {call?.recording_url && (

                <Card className='mt-4'>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Recording
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <audio controls className='w-full'>
                            <source src={call?.recording_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </CardContent>
                </Card>
            )}

            <Card className='mt-4'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Transcripts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='p-4 bg-gray-100 rounded-lg max-h-[600px] overflow-auto'>
                        {call?.transcripts.map(transcript => (
                            <li key={transcript.id} className={`mb-4 flex ${transcript.user == 'assistant' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-lg p-3 rounded-lg ${transcript.user == 'assistant' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
                                    <strong className='capitalize'>{transcript.user}:</strong> {transcript.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    )
}

export default Page