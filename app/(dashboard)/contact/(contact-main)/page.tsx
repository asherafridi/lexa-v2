"use client"
import Breadcrumb from '@/components/Breadcrumb';
import React, { useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { useAllContactFetch, useAllContactFetchByGroup } from '@/hooks/contactHook';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAllGroupFetch } from '@/hooks/groupHook';
import { Label } from '@/components/ui/label';

const Page = () => {
  const {group, groupLoader} = useAllGroupFetch();
  const [groupId,setGroupId]=useState("");

  const handleGroupFilter = (groupId: string) => {
    setGroupId(groupId);
  };
  
  const { contact, contactLoader, setContact } = useAllContactFetchByGroup(groupId);

  if (contactLoader) {
    return <Skeleton className='w-full h-[400px] rounded' />;
  }

  return (
    <>
      <Card className='p-4'>
        <Label>Filter By Group</Label>
        <Select onValueChange={handleGroupFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter By Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-group">All Groups</SelectItem>
            {group.map((group) => (
              <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      <Card className="rounded p-4 mt-4">
        <DataTable columns={columns(setContact, contact)} data={contact} />
      </Card>
    </>
  )
};

export default Page;
