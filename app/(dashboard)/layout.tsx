"use client"
import { Poppins } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './app.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const fontSans = Poppins({ subsets:['latin'], weight : ['400','500','600','700','800']});


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
            <div className="main flex p-2">
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                <div className="wrapper w-full pl-0 lg:pl-[300px]">
                    <Navbar  sidebar={sidebar} setSidebar={setSidebar} />
                    <div className="min-h-screen p-2">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
