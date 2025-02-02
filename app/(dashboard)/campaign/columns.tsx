"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { BarChart, EllipsisVertical, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {  useStopCall } from "@/hooks/singleCallHook"
import { useStopBatch } from "@/hooks/campaignHook"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Call = {
  batch_id: string
  created_at :string
}


export const columns: ColumnDef<Call>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell : ({row})=>{
      const formatDate = (isoString :string) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }).format(date);
      };
      
      // Example usage
      const createdAt = row.original.created_at;
      const readableDate = formatDate(createdAt);
      return (readableDate);
    }
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const dateTime = new Date(payment.created_at);
      // Get the current date-time
      const currentDateTime = new Date();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/campaign/detail/${payment.batch_id}`}>Campaign Detail</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={`/campaign/analyze/${payment.batch_id}`}>Analyze Campaign with AI</Link></DropdownMenuItem>
            
            {/* {dateTime > currentDateTime ? (<> */}
              <DropdownMenuItem onClick={() => {
              if (confirm('Are you sure?')) {
                
                useStopBatch(payment.batch_id);
              }
            }}>Stop Call</DropdownMenuItem>
            {/* </>):'' } */}
            
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

]
