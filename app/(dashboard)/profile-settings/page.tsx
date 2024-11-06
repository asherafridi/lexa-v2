"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useAllCallFetch } from '@/hooks/singleCallHook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Lock, UserRound } from 'lucide-react';
import Account from './Account';
import Password from './Password';


const Page = () => {


    return (
        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Profile Settings" />
            <div className=" mt-4 rounded p-4 flex justify-center">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className='flex justify-center gap-4 bg-background border py-2'>
                        <TabsTrigger value="account" className='flex gap-4 text-lg'><UserRound />Account</TabsTrigger>
                        <TabsTrigger value="password" className='flex gap-4 text-lg'><Lock />Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account"><Account /></TabsContent>
                    <TabsContent value="password"><Password /></TabsContent>
                </Tabs>

            </div>
        </div>
    );
};

export default Page;
