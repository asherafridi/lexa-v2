"use client"
import * as React from "react"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { useRouter, useSearchParams } from "next/navigation"

const VerifyPasswordForm = () => {
  const params = useSearchParams();
  const token = params.get('token');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();

  const verifyPassword = (data: any) => {
    axios.post('/api/auth/forgot-password/verify', data)
      .then(response => {
        toast.success(response.data.msg);
          setButtonLoading(false);
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      }).catch(e => {
        toast.error(e.response.data.msg);
          setButtonLoading(false);
      });
  }

  const onSubmit = async (data: any) => {
    setButtonLoading(true);
    console.log({ ...data, token: token });
    verifyPassword({ ...data, token: token });
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-background">
        <CardHeader>
          <CardTitle className="text-center">Create New Password</CardTitle>
          <CardDescription className="text-center"></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="flex flex-col w-full items-center gap-2">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password..."
                  className="outline-none"
                  {...register("password", { required: "Password is required" })}
                />
                {/* {errors.password && <span className="text-destructive">{errors.password.message}</span>} */}
              </div>
              <div className="flex flex-col w-full space-y-1.5 mt-3">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm_password"
                  placeholder="Confirm Password..."
                  className="outline-none"
                  {...register("confirm_password", { required: "Confirm Password is required" })}
                />
                {/* {errors.confirm_password && <span className="text-destructive">{errors.confirm_password.message}</span>} */}
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

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPasswordForm />
    </Suspense>
  );
}

export default Page;
