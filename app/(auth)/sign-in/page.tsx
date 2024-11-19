"use client"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
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
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { CircleDashed } from "lucide-react"
import { UserLoginSchema } from "@/components/schema/user"

interface FormData {
  email: string;
  password: string;
}

interface ErrorType {
  email?: string,
  password?: string
}

const Page = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter();
  const session = useSession();

  if (session.status == 'authenticated' && session.data.user.key_token ==null) {
    router.push('/verify');
  }
  if (session.status == 'authenticated') {
    router.push('/dashboard');
  }

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    const msg = await UserLoginSchema(data);
    if (msg) {
      Object.entries(msg).forEach(([key, value]) => {
        setError(key as keyof ErrorType, { message: value as string });
      });
      toast.error('Validation Error!');
    } else {
      const signin = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (signin?.error) {
        toast.error('Invalid Username or Password');
      } else {
        toast.success('Login Successful');
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-background ">
        <CardHeader className="">
          <CardTitle className="text-center ">Sign In</CardTitle>
          <CardDescription className="text-center">Create AI calls campaigns under 1 minute.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col w-full items-center gap-2" method="POST">
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email..."
                className="outline-none"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="text-destructive">{errors.email.message}</span>}
            </div>
            <div className="h-1"></div>
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Password..."
                className="outline-none"
                {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
              />
              {errors.password && <span className="text-destructive">{errors.password.message}</span>}
            </div>
            <div className="flex w-full flex-col items-end">
              <Link href="/forgot-password" className="text-primary">Forgot Password?</Link>
            </div>
            <div className="h-1"></div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <CircleDashed className="w-[20px] animate-spin" /> : ''} &nbsp;Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span>Don't have an account? <Link href="/sign-up" className="text-primary">Register</Link></span>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
