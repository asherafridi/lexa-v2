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
import { Card } from '@/components/ui/card';

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
        return <Skeleton className='w-full h-[400px] rounded mt-4' />;
    }

    return (
        <Card className=" rounded p-4">
            <div className='flex justify-between items-center'>
                <h3>Create New Agent</h3>
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
                                                        <SelectItem value="en-us">English</SelectItem>
                                                        <SelectItem value="zh">Chinese</SelectItem>
                                                        <SelectItem value="es">Spanish</SelectItem>
                                                        <SelectItem value="fr">French</SelectItem>
                                                        <SelectItem value="de">German</SelectItem>
                                                        <SelectItem value="el">Greek</SelectItem>
                                                        <SelectItem value="hi">Hindi</SelectItem>
                                                        <SelectItem value="ja">Japanese</SelectItem>
                                                        <SelectItem value="ko">Korean</SelectItem>
                                                        <SelectItem value="pt">Portuguese</SelectItem>
                                                        <SelectItem value="it">Italian</SelectItem>
                                                        <SelectItem value="nl">Dutch</SelectItem>
                                                        <SelectItem value="pl">Polish</SelectItem>
                                                        <SelectItem value="ru">Russian</SelectItem>
                                                        <SelectItem value="sv">Swedish</SelectItem>
                                                        <SelectItem value="da">Danish</SelectItem>
                                                        <SelectItem value="fi">Finnish</SelectItem>
                                                        <SelectItem value="id">Indonesian</SelectItem>
                                                        <SelectItem value="ms">Malay</SelectItem>
                                                        <SelectItem value="tr">Turkish</SelectItem>
                                                        <SelectItem value="uk">Ukrainian</SelectItem>
                                                        <SelectItem value="bg">Bulgarian</SelectItem>
                                                        <SelectItem value="cs">Czech</SelectItem>
                                                        <SelectItem value="ro">Romanian</SelectItem>
                                                        <SelectItem value="sk">Slovak</SelectItem>
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
                                        <FormItem className='w-full md:w-full lg:w-1/2 p-2'>
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
                                        <FormItem className='w-full md:w-full lg:w-1/2 p-2 pb-4'>
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

                    <FormButton state={loading} text='Create New Agent' />
                </form>
            </Form>
        </Card>
    )
}

export default Page