import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 });
    }

    const groupId = req.nextUrl.searchParams.get('groupId');
    let contact;

    try {
        if (groupId) {
            // Fetch contacts by group ID
            contact = await prisma.contact.findMany({
                where: {
                    userId: +session.user.id, // Ensure correct type conversion
                    groupId: +groupId, // Convert groupId to a number if necessary
                },
                select: {
                    contactGroup: {
                        select: {
                            name: true,
                        },
                    },
                    name: true,
                    number: true,
                    id: true,
                },
            });
        } else {
            // Fetch all contacts if no groupId is provided
            contact = await prisma.contact.findMany({
                where: {
                    userId: +session.user.id,
                },
                select: {
                    contactGroup: {
                        select: {
                            name: true,
                        },
                    },
                    name: true,
                    number: true,
                    id: true,
                },
            });
        }

        // Return fetched contacts
        return NextResponse.json({ contacts: contact }, { status: 200 });

    } catch (error) {
        // Handle potential errors
        return NextResponse.json({ msg: 'Failed to fetch contacts', error: error }, { status: 500 });
    }
}
