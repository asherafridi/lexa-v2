"use client"
import Breadcrumb from '@/components/Breadcrumb';
import FormButton from '@/components/FormButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useFetchVectorDetail } from '@/hooks/vectorHook';
import pdfToText from 'react-pdftotext';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

const Page = ({params} : {params:{id:string}}) => {
    const router = useRouter();
    const {vector, vectorLoader} = useFetchVectorDetail(params.id);
    const [loading, setLoading] = useState(false);

    // State for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (vector) {
            setName(vector.name || '');
            setDescription(vector.description || '');
            setText(vector.text || '');
        }
    }, [vector]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = { 
            name,
            description,
            text,
            id: params.id
        };

        axios.post('/api/vector/update', data)
            .then(response => {
                toast.success(response.data?.msg);
                console.log(response);
                setTimeout(() => {
                    setLoading(false);
                    router.push('/vector');
                }, 1000);
            })
            .catch(e => {
                toast.error(e?.response?.data?.error);
                setLoading(false);
                console.log(e);
            });
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === 'application/pdf') {
                try {
                    const extractedText = await pdfToText(file);
                    setText(extractedText);
                } catch (error) {
                    console.error("Failed to extract text from pdf");
                    toast.error('Failed to extract text from PDF');
                }
            } else {
                toast.error('Unsupported file type. Please upload a PDF');
            }
        }
    }

    if(vectorLoader){
        return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    }

    return (
        <div className='p-5 min-h-screen'>
            <div className="bg-background border mt-4 rounded p-4">
                <div className='flex justify-between items-center'>
                    <h3>Vector Store</h3>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 flex w-full flex-wrap">
                    <div className='w-full md:w-1/2 lg:w-full p-2'>
                        <Label>Name</Label>
                        <Input 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='w-full md:w-1/2 lg:w-full p-2'>
                        <Label>Description</Label>
                        <Input 
                            placeholder="Description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='w-full md:w-1/2 lg:w-full p-2'>
                        <Label>File (.pdf)</Label>
                        <Input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className='w-full md:w-1/2 lg:w-full p-2'>
                        <Label>Text</Label>
                        <Textarea 
                            placeholder="Text" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            className='w-full' 
                            rows={10} 
                        />
                    </div>

                    <FormButton state={loading} />
                </form>
            </div>
        </div>
    )
}

export default Page