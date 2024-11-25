"use client"
import { Montserrat } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './app.css';
import nextAuth, { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { setEngine } from "crypto";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fontSans = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [sidebar, setSidebar] = useState('dashboard');
    const session = useSession();
    useEffect(() => {
        if (session.status == 'unauthenticated') {
            toast.error('Unauthenticated User');
            setTimeout(() => {
                router.push('/sign-in');
            }, 500);
        }
    }, [{}, sidebar])


    return (
        <div className={fontSans.className}>
            <div className="main flex">
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                <div className="wrapper w-full pl-0 lg:pl-[300px]">
                    <Navbar  sidebar={sidebar} setSidebar={setSidebar} />
                    <div className="p-5 min-h-screen">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
