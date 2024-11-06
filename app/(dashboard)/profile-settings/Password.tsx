import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { CircleDashed } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Account = () => {
    const form = useForm({
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_password: '',
        }
    });

    const [loading, setLoading] = useState(false);

    const submit = async (data: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/user/profile/password-update', data);
            toast.success(response.data.msg);
        } catch (e: any) {
            toast.error(e.response?.data?.error || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-background border rounded-md p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full flex-wrap">
                    <FormField
                        control={form.control}
                        name="current_password"
                        rules={{ required: 'Current Password is required' }}
                        render={({ field }) => (
                            <FormItem className='w-full md:w-full lg:w-1/3 p-2'>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Current Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="new_password"
                        rules={{ required: 'New Password is required' }}
                        render={({ field }) => (
                            <FormItem className='w-full md:w-full lg:w-1/3 p-2'>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="New Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        rules={{
                            required: 'Please confirm your new password',
                            validate: (value) =>
                                value === form.getValues('new_password') || 'Passwords do not match'
                        }}
                        render={({ field }) => (
                            <FormItem className='w-full md:w-full lg:w-1/3 p-2'>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='m-2'>
                        <Button type='submit' disabled={loading}>
                            {loading ? <CircleDashed className="m-2 w-[20px] animate-spin" /> : 'Update Password'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Account;
