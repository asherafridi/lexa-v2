"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Contact from './Contact';
import FileUpload from './FileUpload';
import { Card } from '@/components/ui/card';





const Page = () => {
    const [mode,setMode] = useState('contact');

    const toggleBox =()=>{
        mode == 'contact' ? setMode('event') : setMode('contact');
    }
  
  return (
        <Card className='p-4'>
            <div className='flex justify-between items-center'>
                <h3>Add Contact</h3>
                <Button variant="outline" onClick={toggleBox} className="">
                    <Upload className='w-4 mr-2'/>
                     {mode == 'contact' ? 'Upload Contacts via File' : 'Add Contact Manually'}
                </Button>
            </div>
            {mode=='contact' ? (
                <Contact />
            ) : (<FileUpload />)}
        </Card>
  )
}

export default Page