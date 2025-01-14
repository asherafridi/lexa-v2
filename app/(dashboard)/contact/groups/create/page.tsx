"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import FormButton from '@/components/FormButton'
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-phone-input-2/lib/style.css'
import { Card } from '@/components/ui/card'

const Contact = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const submit = (data: any) => {
        setLoading(true);

        axios.post('/api/contacts/groups/create', data).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                setValue('name', "");
            });
        }).catch(e => {
            toast.error(e.response.data?.error);
            setLoading(false);
            console.log(e);
        });
    };

    return (
        <Card className='p-4'>
            <form className='w-full mt-5 gap-4' onSubmit={handleSubmit(submit)}>
                <div className='w-full'>
                    <Label htmlFor='name'>Group name</Label>
                    <Input type='text' {...register('name', { required: true })} className='w-full mt-2' placeholder='Marketing Group' />
                    {errors.name && <span className="text-red-500">This field is required</span>}
                </div>
                <div className='w-full mt-4'>
                    <FormButton state={loading} text='Add New Group' />
                </div>
            </form>

        </Card>
    );
}

export default Contact;
