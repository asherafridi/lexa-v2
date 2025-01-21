"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Phone,
  Headphones,
  PhoneIncoming,
  Users,
  PhoneOutgoing,
  Webhook,
  PenTool,
  ChevronDown,
  ChevronUp,
  CalendarClock,
  BotMessageSquare,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Sidebar = ({ sidebar, setSidebar }: { sidebar: any; setSidebar: any }) => {
  const pathname = usePathname();
  const session = useSession();

  // State to manage open/close of submenus
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  // Define the menu items and their submenus
  const menuItems = [
    { href: "/dashboard", icon: <LayoutDashboard />, text: "Dashboard", key: "dashboard" },
    { href: "/number", icon: <Phone />, text: "Phone Numbers", key: "number" },
    { href: "/agent", icon: <Headphones />, text: "Agents", key: "agent" },
    { href: "/inbound-agent", icon: <PhoneIncoming />, text: "Inbound Agent", key: "inbound-agent" },
    {
      href: "/contact",
      icon: <Users />,
      text: "Contacts",
      key: "contact",
      submenu: [
        { href: "/contact", text: "All Contacts", key: "contact-all" },
        { href: "/contact/groups", text: "Groups", key: "contact-groups" },
      ],
    },
    { href: "/call", icon: <PhoneOutgoing />, text: "Calls", key: "call" },
    {
      href: "/campaign",
      icon: <Webhook />,
      text: "Campaigns",
      key: "campaign",
    },
    { href: "/vector", icon: <PenTool />, text: "Information", key: "vector" },
    {
      href: "/chatbot",
      icon: <BotMessageSquare />,
      text: "Chatbot",
      key: "chatbot",
      submenu: [
        { href: "/chatbot", text: "Chatbot", key: "chatbot" },
        { href: "/chatbot/knowledge", text: "Knowledge Base", key: "knowledge" },
      ],
    },
  ];

  // Function to toggle submenu open/close
  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`sidebar w-[300px] max-h-screen overflow-y-auto p-3 text-sm bg-white rounded-lg border border-gray-300  text-foreground  lg:fixed shadow-sm lg:block ${sidebar ? "block" : "hidden"
          }`}
      >
        <div className='hidden lg:block'>
           <h1 className='text-2xl font-semibold '>LexaTalk</h1>
           <p>AI Phone Caller Maker</p>
         </div>
        <div className="mt-16 mb-4">
          <ul className="grid gap-2 menu">
            {menuItems.map(({ href, icon, text, key, submenu }) => (
              <React.Fragment key={key}>
                {/* Main Menu Item */}
                <li>
                  <Link
                    href={submenu ? '#' : href}
                    className={`flex p-4 py-3 rounded  text-foreground gap-4 hover:bg-gray-200 ${pathname.includes(href) ? "active" : ""
                      }`}
                    onClick={() => (submenu ? toggleSubmenu(key) : setSidebar(false))}
                  >
                    {icon}
                    <span>{text}</span>
                    {submenu && (openSubmenus[key] ? <ChevronUp className="ml-auto" /> : <ChevronDown className="ml-auto" />)}
                  </Link>

                  {/* Submenu Items */}
                  {submenu && openSubmenus[key] && (
                    <ul className=" space-y-2  bg-gray-300">
                      {submenu.map(({ href, text, key }) => (
                        <li key={key}>
                          <Link
                            href={href}
                            className={`flex p-4 py-3 rounded  text-foreground gap-4 hover:bg-gray-200`}
                            onClick={() => setSidebar(false)}
                          >
                            {text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </React.Fragment>
            ))}
            {session.data?.user.email == 'ashirafridi.work@gmail.com' ?  
             <Link href={'/users'}  className={`flex p-4 py-3 rounded text-foreground  text-foreground gap-4 hover:bg-gray-200 ${pathname.includes('users')  ? 'active' : ''}`} onClick={() => setSidebar(false)}>
                   <Users size={'20px'} /> <span>Users</span>
               </Link>: '' }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


// "use client";
// import Link from 'next/link';
// import React from 'react';
// import { LayoutDashboard, Phone, Headphones, PhoneIncoming, Users, PhoneOutgoing, Webhook, PenTool, Info } from 'lucide-react';
// import { usePathname } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// const Sidebar = ({ sidebar, setSidebar }: { sidebar: any, setSidebar: any }) => {
  
//   const session = useSession();
//   const pathname = usePathname();
//   const menuItems = [
//     { href: '/dashboard', icon: <LayoutDashboard size={'20px'} />, text: 'Dashboard', key: 'dashboard' },
//     { href: '/number', icon: <Phone size={'20px'}  />, text: 'Phone Numbers', key: 'number' },
//     { href: '/agent', icon: <Headphones size={'20px'}  />, text: 'Agents', key: 'agent' },
//     { href: '/inbound-agent', icon: <PhoneIncoming size={'20px'}  />, text: 'Inbound Agent', key: 'inbound-agent' },
//     { href: '/contact', icon: <Users size={'20px'}  />, text: 'Contacts', key: 'contact' },
//     { href: '/call', icon: <PhoneOutgoing size={'20px'}  />, text: 'Calls', key: 'call' },
//     { href: '/campaign', icon: <Webhook size={'20px'}  />, text: 'Campaigns', key: 'campaign' },
//     { href: '/vector', icon: <PenTool size={'20px'}  />, text: 'Information', key: 'vector' },
//     { href: '/help', icon: <Info size={'20px'}  />, text: 'Need Help?', key: 'help' },
//   ];

//   return (
//     <div>
//       {/* Mobile Sidebar Toggle */}
      
      
//       {/* Sidebar */}
//       <div className={`sidebar w-[300px] p-3 text-sm bg-white rounded-lg border border-gray-300  text-foreground  lg:fixed shadow-sm lg:block ${sidebar ? 'block' : 'hidden'}`}>
//       <div className='hidden lg:block'>
//           <h1 className='text-2xl font-semibold '>Lexa Talk</h1>
//           <p>AI Phone Caller Maker</p>
//         </div>
//         <div className='mt-16'>
//           <ul className='grid gap-1  menu'>
//             {menuItems.map(({ href, icon, text, key }) => (
//               <Link href={href} key={key} className={`flex p-4 py-3 rounded  text-foreground gap-4 hover:bg-gray-200 ${pathname.includes(href)  ? 'active' : ''}`} onClick={() => setSidebar(false)}>
//                   {icon} <span>{text}</span>
//               </Link>
//             ))}
//             {session.data?.user.email == 'ashirafridi.work@gmail.com' ?  
//             <Link href={'/users'}  className={`flex p-4 py-3 rounded text-foreground  text-foreground gap-4 hover:bg-gray-200 ${pathname.includes('users')  ? 'active' : ''}`} onClick={() => setSidebar(false)}>
//                   <Users size={'20px'} /> <span>Users</span>
//               </Link>: '' }
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
