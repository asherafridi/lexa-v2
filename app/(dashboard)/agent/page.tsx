"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { useAllAgentFetch } from '@/hooks/agentHook';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useAgentDelete } from '@/hooks/agentHook';
import { Skeleton } from '@/components/ui/skeleton';



const Page = () => {
  const { data, loading } = useAllAgentFetch();


  if (loading) {
    return <Skeleton className='w-full h-[400px] rounded mt-4' />;
  }

  return (
    <div className='p-5 min-h-screen'>
      <div className='border-b-2  flex justify-between w-full'>

        <div className=' text-3xl  pb-8 mr-2'>Agents</div>
        <div className='gap-2 flex-col md:flex-row  items-end'>
          <Link href='/agent/create' ><Button>Create New Agent</Button></Link>
          <Link href='/call/create' className='mt-2 md:mt-0' ><Button variant={'secondary'}>Make a Call</Button></Link></div>
      </div>
      <div className=" mt-4 rounded p-4 flex gap-2 flex-wrap">
        {data?.map((element, index) => (
          <div key={index} className='bg-white border rounded w-full md:w-1/2 lg:w-1/4 p-3'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar>
                  <AvatarFallback>{element.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2>{element.name}</h2>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={`/agent/edit/${element.id}`}>Edit Agent</Link></DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => {
                    if (confirm('Are you sure?')) {
                      useAgentDelete(element.id);
                    }
                  }}>Delete Agent</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex mt-10 gap-4'>
              <span>{element.numberId}</span>
            </div>
            <div className='flex mt-2 gap-4'>
              <Badge variant="default">{element.agentType}</Badge>
              <span>{element.language}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page