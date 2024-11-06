"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FormButton from "@/components/FormButton"
import axios from "axios"
import toast from "react-hot-toast"

const Page = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [buttonLoading, setButtonLoading] = useState(false);


  
  const forgotPassword = (email:string)=>{
    axios.post('/api/auth/forgot-password',{email:email})
    .then(response=>{
        toast.success(response.data.msg);
    }).catch(e=>{
        toast.error(e.response.data.msg);
    })
}
  const onSubmit = async (data:any) => {
    setButtonLoading(true);
    forgotPassword(data.email);
    setTimeout(() => { // Simulate an API call
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-background">
        <CardHeader>
          <CardTitle className="text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">Create AI calls campaigns under 1 minute.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full items-center gap-2">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email..."
                  className="outline-none"
                  {...register("email", { required: "Email is required" })}
                />
                {/* {errors.email && <span className="text-destructive">{errors.email.message}</span>} */}
              </div>

              <div className="h-1"></div>
              <FormButton state={buttonLoading} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page;
