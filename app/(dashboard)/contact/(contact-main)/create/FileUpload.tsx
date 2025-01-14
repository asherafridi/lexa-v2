import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useAllGroupFetch } from '@/hooks/groupHook';
import FormButton from '@/components/FormButton';

interface Contact {
  id: number;
  name: string;
  number: string;
  groupId: string;
  status: string;
}

export default function FileUpload() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, control } = useForm();
    
    // Replace this with your actual group fetching hook
    const { group, groupLoader } = useAllGroupFetch(); 

    const handleCSVUpload = async (csvText: any, selectedGroupId: string) => {
        setLoading(true);
        setError(null);

        try {
            const parsedContacts = await parseCSV(csvText, selectedGroupId);
            setContacts(parsedContacts);
        } catch (error: any) { // Specify the type of error as any or Error
            setError('Error parsing CSV file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const parseCSV = async (csvText: any, selectedGroupId: string) => {
        const rows = csvText.split('\n');
        const parsedContacts: Contact[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const [name, number] = row.split(',');
            const data = { name, number, groupId: selectedGroupId };

            try {
                const response = await axios.post('/api/contacts/create', data);
                parsedContacts.push({ id: i, name, number, groupId: selectedGroupId, status: 'Contact Added Successfully' });
            } catch (error: any) { // Specify the type of error as any or Error
                parsedContacts.push({ id: i, name, number, groupId: selectedGroupId, status: error.response?.data?.error || 'Unknown Error' });
            }
        }

        return parsedContacts;
    };

    const handleFileUpload = (event: any, selectedGroupId: string) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e?.target?.result;
            handleCSVUpload(text, selectedGroupId);
        };
        reader.readAsText(file);
    };

    const onSubmit = (data: any) => {
        // This will trigger CSV upload and send selected groupId
        const selectedGroupId = data.groupId;
        const fileInput = document.getElementById('csvFileInput') as HTMLInputElement;

        if (fileInput && fileInput.files) {
            handleFileUpload({ target: { files: fileInput.files } }, selectedGroupId);
        }
    };

    if (groupLoader) {
        return <Skeleton className='w-full h-[400px] rounded mt-4' />;
    }

    return (
        <div>
            <div className='border mt-4'>
                <h2>Upload CSV File. Download <Link href="" className='text-primary'>sample file</Link> for input download.</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Select Group */}
                    <Controller
                        name="groupId"
                        control={control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="groupId">Select Group:</label>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {group && group.map((ele: any, index: any) => (
                                            <SelectItem key={index} value={`${ele?.id}`}>{ele?.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </>
                        )}
                        rules={{ required: true }}
                    />
                    
                    {/* CSV File Upload */}
                    <Input
                        id="csvFileInput"
                        type="file"
                        accept=".csv"
                        className='mt-4 mmb-4'
                        {...register('file', { required: true })}
                    />
                    <div className='mt-3'></div>
                    <FormButton state={loading} text='Upload & Submit'  />
                </form>
            </div>
            
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
            <div className='border mt-2 p-4'>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact?.id} className={contact?.status === 'Contact Added Successfully' ? 'text-primary' : 'text-red-500'}>
                            Name: {contact?.name} - Number: {contact?.number} - Group: {contact?.groupId} - Status: {contact?.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
