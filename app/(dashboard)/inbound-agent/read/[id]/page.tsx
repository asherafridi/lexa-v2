"use client"
import Breadcrumb from '@/components/Breadcrumb';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import {  FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useFetchVectorDetail } from '@/hooks/vectorHook';
import { Skeleton } from '@/components/ui/skeleton';

const Page = async ({params} : {params:{id:string}}) => {
    
    const {vector,vectorLoader} = useFetchVectorDetail(params.id);

    
    if(vectorLoader){
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }
    return (

        <div className='p-5 min-h-screen'>
            <div className="bg-background border mt-4 rounded p-4">
                <h2><b>Vector Id :</b> {vector?.id}</h2>
                <h2><b>Name :</b> {vector?.name}</h2>
                <h2><b>Description :</b> {vector?.description}</h2>
                <h2><b>Text :</b> {vector?.text}</h2>

                    
            </div>
        </div>
    )
}

export default Page