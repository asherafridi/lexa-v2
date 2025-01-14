"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/FormButton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFetchNumber, useFetchVoice } from '@/hooks/agentHook'
import { useNumberFetch } from '@/hooks/numberHook';
import { useToolsFetch, useVectorFetch } from '@/hooks/vectorHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const Page = () => {

    const { voice, voiceLoader } = useFetchVoice();
    const { number, numberLoader } = useNumberFetch();
    const { vector, vectorLoader } = useVectorFetch();
    const { tools, toolsLoader } = useToolsFetch();


    const form = useForm();
    const [loading, setLoading] = useState(false);

    const submit = (values: any) => {
        setLoading(true);
        console.log(values);
        axios.post('/api/users/create', values).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                form.reset();
            })
        }).catch(e => {
            toast.error(e?.response?.data?.error);
            setLoading(false);
            console.log(e);
        });
    }


    if (numberLoader || voiceLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4' />;
    }

    return (
        <Card className=" rounded p-4">
            <CardHeader className='flex justify-between items-center'>
                <CardTitle>Create New User</CardTitle>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full  flex-wrap ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />






                    


                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



<FormField
                        control={form.control}
                        name="balance"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                <FormLabel>Initial Balance</FormLabel>
                                <FormControl>
                                    <Input placeholder="Balance" {...field} defaultValue={2} min={2} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <br />

                    <FormButton state={loading} />
                </form>
            </Form>
        </Card>
    )
}

export default Page