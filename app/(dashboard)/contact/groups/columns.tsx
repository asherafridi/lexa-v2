"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { BarChart, EllipsisVertical, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useContactDelete } from "@/hooks/contactHook"
import { useRouter } from "next/navigation"
import { useGroupDelete } from "@/hooks/groupHook"
import toast from "react-hot-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Group = {
    id: string
    name: string
}


export const columns = (setGroups: (contacts: Group[]) => void, groups: Group[]): ColumnDef<Group>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
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
              <DropdownMenuItem><Link href={`/contact/groups/edit/${payment.id}`}>Edit Group</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={async()=> {
                if(confirm('This will delete all your group contacts. Are you sure?')){
                    
                    try {
                      await useGroupDelete(payment.id); // Delete contact
                      setGroups(groups.filter(c => c.id !== payment.id)); // Remove from state
                    } catch (error) {
                      console.error("Failed to delete contact:", error);
                      toast.error('Faild to remove the group.');
                    }
                  }
                    
                }
              }>Delete Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
    
]
