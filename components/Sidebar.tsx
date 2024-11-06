"use client";
import Link from 'next/link';
import React from 'react';
import { LayoutDashboard, Phone, Headphones, PhoneIncoming, Users, PhoneOutgoing, Webhook, PenTool, Info } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = ({ sidebar, setSidebar }: { sidebar: any, setSidebar: any }) => {
  const pathname = usePathname();
  const menuItems = [
    { href: '/dashboard', icon: <LayoutDashboard />, text: 'Dashboard', key: 'dashboard' },
    { href: '/number', icon: <Phone />, text: 'Phone Numbers', key: 'number' },
    { href: '/agent', icon: <Headphones />, text: 'Agents', key: 'agent' },
    { href: '/inbound-agent', icon: <PhoneIncoming />, text: 'Inbound Agent', key: 'inbound-agent' },
    { href: '/contact', icon: <Users />, text: 'Contacts', key: 'contact' },
    { href: '/call', icon: <PhoneOutgoing />, text: 'Calls', key: 'call' },
    { href: '/campaign', icon: <Webhook />, text: 'Campaigns', key: 'campaign' },
    { href: '/vector', icon: <PenTool />, text: 'Information', key: 'vector' },
    { href: '/help', icon: <Info />, text: 'Need Help?', key: 'help' },
  ];

  return (
    <div>
      {/* Mobile Sidebar Toggle */}
      
      
      {/* Sidebar */}
      <div className={`sidebar w-[300px] p-3 min-h-screen bg-background text-accent-foreground border-r lg:fixed shadow-sm lg:block ${sidebar ? 'block' : 'hidden'}`}>
        <div className='hidden lg:block'>
          <h1 className='text-2xl font-semibold '>Lexa Talk</h1>
          <p>AI Phone Caller Maker</p>
        </div>
        <div className='mt-16'>
          <ul className='grid gap-2 menu'>
            {menuItems.map(({ href, icon, text, key }) => (
              <Link href={href} key={key} className={`flex p-4 py-3 rounded bg-background text-secondary-foreground gap-4 hover:bg-primary ${pathname.includes(href)  ? 'active' : ''}`} onClick={() => setSidebar(false)}>
                  {icon} <span>{text}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
