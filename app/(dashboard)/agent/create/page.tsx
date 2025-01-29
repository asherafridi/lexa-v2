"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
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
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        voice: '',
        numberId: '',
        first_sentence: '',
        wait_for_greeting: 'false',
        prompt: '',
        max_duration: '1',
        transfer_number: '',
        language: 'en-us',
        model: 'enhanced',
        information: '',
        tools: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('/api/agent/create', formState);
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                // Reset form
                setFormState({
                    name: '',
                    voice: '',
                    numberId: '',
                    first_sentence: '',
                    wait_for_greeting: 'false',
                    prompt: '',
                    max_duration: '1',
                    transfer_number: '',
                    language: 'en-us',
                    model: 'enhanced',
                    information: '',
                    tools: ''
                });
                
            }, 2000);
        } catch (error: any) {
            toast.error(error?.response?.data?.error || 'An error occurred');
            console.error(error);
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    if (numberLoader || voiceLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4' />;
    }

    return (
        <Card className="rounded p-4">
            <div className='flex justify-between items-center'>
                <h3>Create New Agent</h3>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-wrap">
                {/* Name Field */}
                <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                    <Label>Name</Label>
                    <Input
                        name="name"
                        placeholder="Agent Name"
                        value={formState.name}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Voice Select */}
                <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                    <Label>Voice</Label>
                    <Select
                        value={formState.voice}
                        onValueChange={(value) => handleSelectChange('voice', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                            {voice.map((element, index) => (
                                <SelectItem key={index} value={element?.id}>
                                    {element?.name} - {element?.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Number Select */}
                <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
                    <Label>Number</Label>
                    <Select
                        value={formState.numberId}
                        onValueChange={(value) => handleSelectChange('numberId', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                            {number.map((element, index) => (
                                <SelectItem key={index} value={`${element?.phone_number}`}>
                                    {element?.phone_number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* First Sentence */}
                <div className='w-full md:w-1/2 lg:w-1/2 p-2'>
                    <Label>First Sentence</Label>
                    <Input
                        name="first_sentence"
                        placeholder="First Sentence"
                        value={formState.first_sentence}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Wait for Greeting */}
                <div className='w-full md:w-1/2 lg:w-1/2 p-2'>
                    <Label>Wait For Greeting</Label>
                    <Select
                        value={formState.wait_for_greeting}
                        onValueChange={(value) => handleSelectChange('wait_for_greeting', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Prompt Textarea */}
                <div className='w-full mb-4 p-2'>
                    <Label>Prompt</Label>
                    <Textarea
                        name="prompt"
                        placeholder="Type your prompt here...."
                        value={formState.prompt}
                        onChange={handleInputChange}
                        className='w-full'
                        rows={10}
                    />
                    <div className='text-right mt-2'>
                        <a className='text-blue-800' href="">Prompt Guide</a>
                    </div>
                </div>

                {/* Max Duration */}
                <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                    <Label>Max Duration</Label>
                    <Input
                        name="max_duration"
                        placeholder="Max Duration"
                        value={formState.max_duration}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Transfer Number */}
                <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                    <Label>Transfer Number</Label>
                    <Input
                        name="transfer_number"
                        placeholder="Transfer Call to"
                        value={formState.transfer_number}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Language Select */}
                <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                    <Label>Language</Label>
                    <Select
                        value={formState.language}
                        onValueChange={(value) => handleSelectChange('language', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
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
                </div>

                {/* Model Select */}
                <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
                    <Label>Model</Label>
                    <Select
                        value={formState.model}
                        onValueChange={(value) => handleSelectChange('model', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='enhanced'>Enhanced</SelectItem>
                            <SelectItem value='gpt4'>GPT 4</SelectItem>
                            <SelectItem value='base'>Base</SelectItem>
                            <SelectItem value='turbo'>Turbo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Information Select */}
                <div className='w-full md:w-full lg:w-1/2 p-2'>
                    <Label>Company Informations</Label>
                    <Select
                        value={formState.information}
                        onValueChange={(value) => handleSelectChange('information', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select information" />
                        </SelectTrigger>
                        <SelectContent>
                            {vector?.map((element, index) => (
                                <SelectItem key={index} value={element?.vector_id}>
                                    {element?.name} - {element?.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tools Select */}
                <div className='w-full md:w-full lg:w-1/2 p-2 pb-4'>
                    <Label>Tools</Label>
                    <Select
                        value={formState.tools}
                        onValueChange={(value) => handleSelectChange('tools', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select tool" />
                        </SelectTrigger>
                        <SelectContent>
                            {tools?.map((element, index) => (
                                <SelectItem key={index} value={element?.tool_id}>
                                    {element?.tool?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <FormButton state={loading} text='Create New Agent' />
            </form>
        </Card>
    )
}

export default Page