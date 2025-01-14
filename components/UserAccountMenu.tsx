"use client"
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserAccountMenu = () => {
    const router = useRouter();
    const [balance,setBalance] = useState(0.00);
    const logout = ()=>{
        signOut();
        router.push('/sign-in');
    }
  const session = useSession();
    useEffect(()=>{
        axios.get('/api/user/balance').then(response=>{
            setBalance(response?.data.balance);
        })
    },[])

    return (
        <div className='flex items-center gap-5'>
            <h3 className='font-medium border p-2 px-4 rounded-lg text-sm md:text-xl'>$ {Math.round(balance*100) /100}</h3>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={session?.data?.user?.image ? session?.data?.user?.image : undefined} />
                        <AvatarFallback>{session?.data?.user?.name?.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{router.push('/profile-settings')}}>Profile Setting</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className='pointer'> Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default UserAccountMenu