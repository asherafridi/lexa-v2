"use client"
import Breadcrumb from '@/components/Breadcrumb';
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useFetchVectorDetail } from '@/hooks/vectorHook';
import pdfToText from 'react-pdftotext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';



const Page = async ({params} : {params:{id:string}}) => {
    const form = useForm();
    const router = useRouter();
    const {vector,vectorLoader} = useFetchVectorDetail(params.id);

    const [loading, setLoading] = useState(false);

    const submit = async (values: any) => {
        setLoading(true);

        const data = { ...values,id:params.id };

        axios.post('/api/vector/update', data)
            .then(response => {
                toast.success(response.data?.msg);
                setTimeout(() => {
                    setLoading(false);
                    form.reset();
                    router.push('/vector');
                    
                }, 1000);
            })
            .catch(e => {
                toast.error(e?.response?.data?.error);
                setLoading(false);
                console.log(e);
            });
    }

    
    function handleFrontFileChange(e:any) {
        const file = e.target.files[0]; // Get the first file from the selected files
        if (file) {

            if (file.type === 'application/pdf') {
                pdfToText(file)
                    .then(text => form.setValue('text', text))
                    .catch(error => console.error("Failed to extract text from pdf"))

            } else {
                toast.error('Unsupported file type. Please upload a text PDF');
            }
        }
    }
    
    if(vectorLoader){
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }
    return (

        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Edit Company Information" />
            <div className="bg-background border mt-4 rounded p-4">
                <div className='flex justify-between items-center'>
                    <h3>Vector Store</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full flex-wrap">
                        <FormField
                            control={form.control}
                            name="name"
                            defaultValue={vector?.name}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-full p-2'>
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
                            name="description"
                            defaultValue={vector?.description}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-full p-2'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem className='w-full md:w-1/2 lg:w-full p-2'>
                            <FormLabel>File (.pdf,.docs,.text)</FormLabel>
                            <FormControl>
                                <Input type="file"  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="text"
                            defaultValue={vector?.text}
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-full p-2'>
                                    <FormLabel>Text</FormLabel>
                                    <FormControl>

                                        <Textarea placeholder="Text" {...field} className='w-full' rows={10} />
                                    </FormControl>
                                    <FormMessage />
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