import FormButton from '@/components/FormButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { CircleDashed } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface User {
    name: string;
    email: string;
}

const Account = () => {
    const form = useForm({
        defaultValues: {
            name: '',
            email: ''
        }
    });

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get('/api/user/profile')
            .then(response => {
                setUser(response.data.user);
                console.log(response.data.user);
                form.reset(response.data.user); // Populate the form with fetched data
            })
            .catch(error => {
                toast.error('Something Went Wrong!');
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const submit = async (data: User) => {
        setLoading(true);
        try {
            await axios.post('/api/user/profile/update', data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <Skeleton className='w-full h-16' />;
    }

    return (
        <div className='bg-background border rounded-md p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="mt-4 flex w-full flex-wrap">
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
                                    <Input placeholder="Email" disabled {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='m-2'>
                        <Button type='submit' disabled={loading}>
                            {loading ? <CircleDashed className="m-2 w-[20px] animate-spin" /> : 'Update Changes'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Account;
