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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Vector = {
    id: string
    name: string
    description: string
}


export const columns: ColumnDef<Vector>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "description",
        header: "Description",
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
              <DropdownMenuItem><Link href={`/vector/read/${payment.id}`}>Read Vector Store</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={`/vector/edit/${payment.id}`}>Edit Vector Store</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{
                if(confirm('Are you sure?')){
                    useVectorDelete(payment.id);
                    
                }
              }}>Delete Vector Store</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
    
]
