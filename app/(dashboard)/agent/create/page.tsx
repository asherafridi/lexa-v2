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
        axios.post('/api/agent/create', values).then(response => {
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
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }

    return (
        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Add Agent" />
            <div className="bg-background border mt-4 rounded p-4">
                <div className='flex justify-between items-center'>
                    <h3>Add Agent</h3>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full  flex-wrap ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/3 p-2'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Agent Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="voice"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/3 p-2'>
                                    <FormLabel>Voice</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Voice" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {voice.map((element, index) => (
                                                <SelectItem key={index} value={element?.id}>{element?.name} - {element?.description}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="numberId"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/3 p-2'>
                                    <FormLabel>Number</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Number" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {number.map((element, index) => (
                                                <SelectItem key={index} value={`${element?.phone_number}`}>{element?.phone_number}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="first_sentence"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                    <FormLabel>First Sentence</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Sentence" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="wait_for_greeting"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                                    <FormLabel>Wait For Greeting</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue='false'>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Wait For Greeting" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='true'>True</SelectItem>
                                            <SelectItem value='false'>False</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className='w-full mb-4'>
                                    <FormLabel>Prompt</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your prompt here...." {...field} className='w-full' rows={10} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className='text-right text-blue'><a className='text-blue-800 ' href="">Prompt Guide</a></FormDescription>
                                </FormItem>
                            )}
                        />
                        <Accordion type="single" collapsible className='w-full mb-3 border px-3'>
                            <AccordionItem value="item-1" className='border-none'>
                                <AccordionTrigger className='hover:no-underline'>More Details?</AccordionTrigger>
                                <AccordionContent className='flex flex-wrap'>

                                    <FormField
                                        control={form.control}
                                        name="max_duration"
                                        defaultValue="1"
                                        render={({ field }) => (
                                            <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                                <FormLabel>Max Duration</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Max Duration" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="transfer_number"
                                        render={({ field }) => (
                                            <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                                <FormLabel>Transfer Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Transfer Call to" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="language"
                                        render={({ field }) => (
                                            <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                                <FormLabel>Language</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue='ENG'>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Wait For Greeting" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='ENG'>English</SelectItem>
                                                        <SelectItem value='ESP'>Spanish</SelectItem>
                                                        <SelectItem value='FRE'>French</SelectItem>
                                                        <SelectItem value='POL'>Polish</SelectItem>
                                                        <SelectItem value='GER'>German</SelectItem>
                                                        <SelectItem value='ITA'>Italian</SelectItem>
                                                        <SelectItem value='PBR'>Brazilian Portuguese</SelectItem>
                                                        <SelectItem value='POR'>Portuguese</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                                <FormLabel>Model</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue='enhanced'>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Model" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='enhanced'>Enhanced</SelectItem>
                                                        <SelectItem value='gpt4'>GPT 4</SelectItem>
                                                        <SelectItem value='base'>Base</SelectItem>
                                                        <SelectItem value='turbo'>Turbo</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    
<FormField
                            control={form.control}
                            name="information"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-full lg:w-full p-2'>
                                    <FormLabel>Company Informations</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Information" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {vector.map((element, index) => (
                                                <SelectItem key={index} value={element?.vector_id}>{element?.name} - {element?.description}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />  

                        <FormField
                            control={form.control}
                            name="tools"
                            render={({ field }) => (
                                <FormItem className='w-full md:w-full lg:w-full p-2'>
                                    <FormLabel>Tools</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tools" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tools.map((element, index) => (
                                                <SelectItem key={index} value={element?.tool_id}>{element?.tool?.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <FormButton state={loading} />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page