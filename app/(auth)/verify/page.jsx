"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CircleDashed, Plane, PlaneTakeoff, Send } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"

const Page = () => {
    const [load, setLoad] = useState(false);

    const sendEmail = ()=>{
        axios.post('/api/auth/verification')
        .then(response=>{
            toast.success(response.data.msg);
        }).catch(e=>{
            toast.error(e.response.data.msg);
        })
    }

    const handleResendEmail = () => {
        setLoad(true);
        // Add your email resend logic here, e.g., an API call
        sendEmail();
        setTimeout(() => {
            setLoad(false);
            // Add any toast notifications or success/error handling here
        }, 2000); // Simulate a delay for the email resend process
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-[450px] bg-background">
                <CardHeader>
                    <CardTitle className="text-center">Email Verification</CardTitle>
                    <CardDescription className="text-center">
                        Please verify your email by clicking on the link we just sent to your inbox.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button onClick={handleResendEmail} disabled={load}>
                        {load ? <Send className="w-[20px] animate-pulse" /> : ''} &nbsp;Resend Verification Email
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center"></CardFooter>
            </Card>
        </div>
    );
}

export default Page;
