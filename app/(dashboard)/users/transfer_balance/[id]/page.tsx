"use client"
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchMainBalance, useFetchUser } from '@/hooks/userHook';



const Page = ({ params }: { params: { id: string } }) => {
    const { data, loader } = useFetchMainBalance();
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const form = useForm();


    const submit = (values: any) => {
        setLoading(true);
        axios.post(`/api/users/transfer-balance`, {
            ...values,
            id: params.id
        }).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                router.push('/users');
            }, 2000);
        }).catch(e => {
            toast.error(e.response.data?.error);
            setLoading(false);
            console.log(e);
        });
    }

    if (loader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4' />;
    }


    return (

        <Card className='rounded p-4'>
            <CardHeader className='flex justify-between items-center'>
                <CardTitle>Edit User</CardTitle>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full  flex-wrap ">
                    <FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-full lg:w-full p-2'>
                                <FormLabel>Transfer Balance to this account</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Balance" {...field} max={data} min={2} />
                                </FormControl>
                                <FormDescription>Max Fund you can transfer is {data}</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />




                    <br />

                    <FormButton state={loading} text='Update User' />
                </form>
            </Form>
        </Card>
    )
}

export default Page