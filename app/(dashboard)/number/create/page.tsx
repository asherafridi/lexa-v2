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
import { Skeleton } from '@/components/ui/skeleton';

const Page = () => {

    const { voice, voiceLoader } = useFetchVoice();
    const { number, numberLoader } = useFetchNumber();
    const form = useForm();
    const [loading, setLoading] = useState(false);

    const submit = (values: any) => {
        setLoading(true);
        console.log(values);
        axios.post('/api/number/create', values).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                form.reset();
            })
        }).catch(e => {
            toast.error(e?.response?.data?.error);
            console.log(e);
            setLoading(false);
            form.reset();
        });
    }


    if (numberLoader || voiceLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }

    return (
        <div className='p-5 min-h-screen'>
            <div className="bg-background border mt-4 rounded p-4">
                <div className='flex justify-between items-center'>
                    <h3>Purchase and configure a new outbound phone number. ($15/mo. subscription using your stored payment method).</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full  flex-wrap ">
                        <FormField
                            control={form.control}
                            name="area_code"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-full lg:w-full p-2'>
                                    <FormLabel>Area Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Area Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>Choose a three-digit area code for your phone number. If set as a parameter, a number will only be purchased by exact match if available.</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormButton state={loading} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page