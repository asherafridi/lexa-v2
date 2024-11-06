"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAllAgentFetch } from '@/hooks/agentHook';
import { useAllContactFetch } from '@/hooks/contactHook';
import { useAllCampaignFetch } from '@/hooks/campaignHook';

// Function to get the date 7 days ago in "YYYY-MM-DD" format
const getSevenDaysAgo = () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return sevenDaysAgo.toISOString().split('T')[0];
};

const Filter = () => {
      
    const { data: agents, loading: loadingAgents } = useAllAgentFetch();
    const { campaignData,campaignLoading } = useAllCampaignFetch();

    const form = useForm({
        defaultValues: {
            call_type: '',
            batch: '',
            start_date: getSevenDaysAgo(),
            end_date: new Date().toISOString().split('T')[0],
        }
    });

    const submit = (values:any) => {
        // Encode the values as query parameters
        const queryParams = new URLSearchParams(values).toString();
        
        // Get the current URL
        const currentUrl = new URL(window.location.href);
        
        // Update the search parameters
        currentUrl.search = queryParams;
    
        // Update the URL without reloading the page
        window.history.pushState({}, '', currentUrl.toString());
        
        // Optionally trigger data fetching or other side effects here
    }

    if (loadingAgents || campaignLoading) {
        return <Skeleton className="w-full h-[60px] rounded mt-2" />;
    }

    return (
        <div className='bg-background border mt-4 rounded p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="w-full flex gap-2 justify-between flex-col md:flex-row">
                    <FormField
                        control={form.control}
                        name="call_type"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/5'>
                                <FormLabel>Call Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value={` `}>All</SelectItem>
                                    <SelectItem value="true">Inbound</SelectItem>
                                        <SelectItem value="false">Outbound</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="batch"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/5'>
                                <FormLabel>Batch</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {campaignData.map((ele, index) => (
                                            <SelectItem key={index} value={`${ele.batch_id}`}>{ele.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/5'>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem className='w-full md:w-1/5'>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type='date' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem className='w-full md:w-1/5'>
                        <FormLabel><br /></FormLabel>
                        <FormControl>
                            <Button className='w-full' type="submit">Filter</Button>
                        </FormControl>
                    </FormItem>
                </form>
            </Form>
        </div>
    );
};

export default Filter;
