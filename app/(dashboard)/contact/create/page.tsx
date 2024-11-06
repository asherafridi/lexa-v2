"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Contact from './Contact';
import FileUpload from './FileUpload';





const Page = () => {
    const [mode,setMode] = useState('contact');

    const toggleBox =()=>{
        mode == 'contact' ? setMode('event') : setMode('contact');
    }
  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Add Contact" />
        <div className="bg-background border mt-4 rounded p-4">
            <div className='flex justify-between items-center'>
                <h3>Add Contact</h3>
                <Button variant="outline" onClick={toggleBox} className="">
                    <Upload className='w-4 mr-2'/>
                    Upload Contacts via File
                </Button>
            </div>
            {mode=='contact' ? (
                <Contact />
            ) : (<FileUpload />)}
        </div>
    </div>
  )
}

export default Page