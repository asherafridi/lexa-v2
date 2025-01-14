import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form'; // Import Controller from react-hook-form
import React, { useState } from 'react';
import FormButton from '@/components/FormButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useAllGroupFetch } from '@/hooks/groupHook';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; // Assuming you have a Select component
import { Skeleton } from '@/components/ui/skeleton';

const Contact = () => {
  const { register, setValue, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const {group, groupLoader} = useAllGroupFetch();

  const submit = (data: any) => {
    setLoading(true);

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;
    const contactData = {
      ...data,
      number: '+' + formattedPhoneNumber // include the formatted phone number with country code
    };

    axios.post('/api/contacts/create', contactData).then(response => {
      toast.success(response.data?.msg);
      setTimeout(() => {
        setLoading(false);
        setValue('name', "");
        setPhoneNumber(''); // reset the phone number
      });
    }).catch(e => {
      toast.error(e.response?.data?.error || 'Something went wrong');
      setLoading(false);
      console.log(e);
    });
  };

  if(groupLoader){
    return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
  }

  return (
    <form className='w-full mt-5 gap-4' onSubmit={handleSubmit(submit)}>
      {/* Name Input */}
      <div className='w-full'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' {...register('name', { required: true })} className='w-full mt-2' placeholder='John' />
        {errors.name && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Phone Number Input */}
      <div className='w-full mt-4'>
        <Label htmlFor='number'>Phone Number</Label>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <PhoneInput
              country={'us'}
              value={phoneNumber}
              onChange={(phone) => {
                setPhoneNumber(phone);
                field.onChange(phone); // Update react-hook-form state
              }}
              inputClass="w-full mt-2"
              inputStyle={{ width: '100%' }}
              placeholder='+1 (555) 555-5555'
            />
          )}
          rules={{ required: true }}
        />
        {errors.number && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Group/Contact Select */}
      <div className='w-full mt-4'>
        <Controller
          name="groupId"
          control={control}
          render={({ field }) => (
            <>
              <Label htmlFor="groupId">Group</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Contact" />
                </SelectTrigger>
                <SelectContent>
                  {group && group.map((ele:any, index:any) => (
                    <SelectItem key={index} value={`${ele?.id}`}>{ele?.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.contactId && <span className="text-red-500">This field is required</span>}
            </>
          )}
          rules={{ required: true }}
        />
      </div>

      {/* Submit Button */}
      <div className='w-full mt-4'>
        <FormButton state={loading} text='Add New Contact' />
      </div>
    </form>
  );
};

export default Contact;
