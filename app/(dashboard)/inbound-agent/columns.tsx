"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { BarChart, EllipsisVertical, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useContactDelete } from "@/hooks/contactHook"
import { useRouter } from "next/navigation"
import { useVectorDelete } from "@/hooks/vectorHook"
import { formatDate } from "@/hooks/userHook"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Vector = {
    phone_number: string
    name: string
    description: string
    text: string
    created_at: string
}


export const columns: ColumnDef<Vector>[] = [
    {
        accessorKey: "phone_number",
        header: "Phone Number",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell : ({row})=>{
          return formatDate(row.original.created_at)
        }
    },
    {
      id: "actions",
      header:"Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
   
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
              <DropdownMenuItem><Link href={`/inbound-agent/edit/${payment.phone_number}`}>Edit Inbound Agent</Link></DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
    
]
