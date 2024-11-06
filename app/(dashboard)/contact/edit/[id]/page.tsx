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

const useFetchContact = (id:string, setValue:any) => {
    useEffect(() => {
      axios.post(`/api/contacts/read`,{
        id:id
      })
        .then(response => {
          setValue('name', response?.data?.contact?.name);
          setValue('number', response?.data?.contact?.number);
        })
        .catch(error => {
          console.error('Error fetching contact:', error);
        });
    }, [id]);
  };

const Page = async ({params} : {params:{id:string}}) => {
    const router = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    
    useFetchContact(params.id, setValue);

    const submit = (data: any) => {
        setLoading(true);
        axios.post(`/api/contacts/update`, {
            name:data.name,
            number:data.number,
            id:params.id
        }).then(response => {
            toast.success(response.data?.msg);
            setTimeout(() => {
                setLoading(false);
                router.push('/contact');
            })
        }).catch(e => {
            toast.error(e.data?.error);
            setLoading(false);
            console.log(e);
        });
    }

    return (

        <div className='p-5 min-h-screen'>
            <Breadcrumb title="Edit Contact" />
            <div className="bg-background border mt-4 rounded p-4">

                <form className='w-full mt-5 gap-4' onSubmit={handleSubmit(submit)}>
                    <div className='w-1/3'>
                        <Label htmlFor='name' >Name</Label>
                        <Input type='text' {...register('name')} className='w-full mt-2' placeholder='Full Name' />
                        {errors.exampleRequired && <span>This field is required</span>}
                    </div>
                    <div className='w-1/3 mt-4'>
                        <Label htmlFor='name' >Phone Number</Label>
                        <Input type='text' {...register('number')} className='w-full mt-2' placeholder='Phone Number' />
                    </div>
                    <div className='w-1/3 mt-4'>
                        <FormButton state={loading} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page