"use client"
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { DollarSign, Headphones, Info, LayoutDashboard, MessageSquareDiff, PenTool, Phone, PhoneIncoming, PhoneOutgoing, User, Users, Webhook } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';


const Sidebar = ({ sidebar, setSidebar }: { sidebar: any, setSidebar: any }) => {
  
  
  const pathname = usePathname();
  const menuItems = [
    { href: '/dashboard', icon: <LayoutDashboard />, text: 'Dashboard', key: 'dashboard' },
    { href: '/number', icon: <Phone />, text: 'Phone Numbers', key: 'number' },
    { href: '/agent', icon: <Headphones />, text: 'Agents', key: 'agent' },
    { href: '/inbound-agent', icon: <PhoneIncoming />, text: 'Inbound Agent', key: 'inbound-agent' },
    { href: '/contact', icon: <Users />, text: 'Contacts', key: 'contact' },
    { href: '/call', icon: <PhoneOutgoing />, text: 'Single Call', key: 'call' },
    { href: '/campaign', icon: <Webhook />, text: 'Campaigns', key: 'campaign' },
    { href: '/vector', icon: <PenTool />, text: 'Information', key: 'vector' },
    { href: '/help', icon: <Info />, text: 'Need Help?', key: 'help' },
  ];

  return (
    <div className='sidebar w-[400px] p-3 min-h-screen bg-accent text-accent-foreground shadow-sm hidden lg:block'>
      <div>
        <h1 className='text-2xl font-semibold '>Lexa Talk</h1>
        <p>AI Phone Caller Maker</p>
      </div>
      <div className='mt-16'>
        <ul className='grid gap-2 menu'>
          {menuItems.map(({ href, icon, text, key }) => (
            <Link href={href} key={key} className={`flex p-4 py-3 rounded bg-white text-secondary-foreground gap-4 hover:bg-secondary-hover ${pathname === href ? 'active' : ''}`} onClick={() => setSidebar(key)}>
                {icon} <span>{text}</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
