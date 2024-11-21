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
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAllAgentFetch } from '@/hooks/agentHook';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useAllContactFetch } from '@/hooks/contactHook';
import { Skeleton } from '@/components/ui/skeleton';


const Page = () => {
    const { data, loading } = useAllAgentFetch();
    const { contact, contactLoader } = useAllContactFetch();
    const form = useForm();
    const [buttonLoading, setButtonLoading] = useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
    const [rowArray,setRowArray] = useState<string[]>();
    
    useEffect(()=>{
        setRowArray(Object.keys(rowSelection));
    },[rowSelection]);

    
  

    const submit = async (values: any) => {
        setButtonLoading(true);
        const data = {
            ...values,
            a:rowArray
        }
        console.log(data);
        const response = await axios.post('/api/campaign/create',data).then((res)=>{
            console.log(res.data.msg);
            toast.success('Campaign Launched'); // Display success message
            setButtonLoading(false); // Reset button loading state
            form.reset(); // Reset the form
        }).catch(e=>{
            console.error('Unexpected response:', e);
            toast.error('Unexpected response from server'); // Display error message
            setButtonLoading(false); 
        })
    }


    if (loading && contactLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }


    return (
        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Launch Campaign" />
            <div className="bg-background border mt-4 rounded p-4 w-100">
                <div className='flex justify-between items-center'>
                    <h3>Launch your AI Call Campaign in 29 Seconds.</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-4 w-full mt-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type='name' placeholder='Campaign Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="agentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agent</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Agent" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data.map((element, index) => (
                                                <SelectItem key={index} value={`${element?.id}`}>{element?.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DataTable columns={columns} data={contact} rowSelection={rowSelection} setRowSelection={setRowSelection}  />

                            

                        <FormButton state={buttonLoading} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page