"use client";
import Breadcrumb from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const Page = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // Load chatbot.css for styling
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/gh/asherafridi/lexa-chatbot-cdn/chatbot.css";
    document.head.appendChild(link);

    // Load chatbot.js to enable chatbot functionality
    const script = document.createElement("script");
    script.src = `https://cdn.jsdelivr.net/gh/asherafridi/lexa-chatbot-cdn/chatbot.js?id=${session?.user?.id}`;
    script.async = true;
    document.body.appendChild(script);

    // Clean up the added elements on component unmount
    // return () => {
    //   document.head.removeChild(link);
    //   document.body.removeChild(script);
    // };
  }, []);

  return (
    <Card className="mt-4 p-4">
      <CardHeader>
        <CardTitle>Chatbot URL</CardTitle>
      </CardHeader>
      <Textarea
        value={`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/asherafridi/lexa-chatbot-cdn/chatbot.css">
<script src="https://cdn.jsdelivr.net/gh/asherafridi/lexa-chatbot-cdn/chatbot.js?id=${session?.user?.id}"></script>`}
        readOnly
        className="w-full mt-4"
      />
      <p className='text-sm mt-2 text-gray-500'>Place this code under your website.</p>
    </Card>
  );
};

export default Page;
