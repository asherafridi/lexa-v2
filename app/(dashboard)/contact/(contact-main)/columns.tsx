"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useContactDelete } from "@/hooks/contactHook"
import { useRouter } from "next/navigation"

// This type is used to define the shape of our data.
export type Contact = {
    id: string
    name: string
    number: string
    contactGroup: any
}

export const columns = (setContacts: (contacts: Contact[]) => void, contacts: Contact[]): ColumnDef<Contact>[] => [
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
        accessorKey: "number",
        header: "Number",
    },
    {
        header: "Group",
        cell: ({ row }) => (
          <span>{row.original.contactGroup?.name || "No Group"}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const contact = row.original;

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
              <DropdownMenuItem>
                <Link href={`/contact/edit/${contact.id}`}>Edit Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this contact?')) {
                    try {
                      await useContactDelete(contact.id); // Delete contact
                      setContacts(contacts.filter(c => c.id !== contact.id)); // Remove from state
                    } catch (error) {
                      console.error("Failed to delete contact:", error);
                      alert("Failed to delete contact");
                    }
                  }
                }}
              >
                Delete Contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }
];
