"use client"
import Breadcrumb from '@/components/Breadcrumb';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/FormButton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import pdfToText from 'react-pdftotext'
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const Page = () => {
    const form = useForm();
    const [loading, setLoading] = useState(false);

    const submit = async (values: any) => {
        setLoading(true);

        const data = { ...values };

        axios.post('/api/chatbot/knowledge', data)
            .then(response => {
                toast.success(response.data?.msg);
                setTimeout(() => {
                    setLoading(false);
                    form.reset();
                    
                }, 1000);
            })
            .catch(e => {
                toast.error(e?.response?.data?.error);
                setLoading(false);
                console.log(e);
            });
    }


    function handleFrontFileChange(e :any) {
        const file = e.target.files[0]; // Get the first file from the selected files
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a URL for the selected file
            console.log(file);
            let fileText = '';

            if (file.type === 'application/pdf') {
                console.log('ashir');
                pdfToText(file)
                    .then(text => form.setValue('text', text))
                    .catch(error => console.error("Failed to extract text from pdf"))

            } else {
                toast.error('Unsupported file type. Please upload a text PDF');
                setLoading(false);
                return;
            }
        }
    }


    return (
        <Card className='p-5 min-h-screen'>
                <CardHeader>
                    <CardTitle>Update Knowledge via PDF,Text</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full flex-wrap">
                        
                        <FormItem className='w-full md:w-1/2 lg:w-full p-2'>
                            <FormLabel>File (.pdf)</FormLabel>
                            <FormControl>
                                <Input type="file" onChange={handleFrontFileChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="text"
                            defaultValue={''}
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
        </Card>
    )
}

export default Page;
