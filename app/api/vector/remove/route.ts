import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }



    try {
        console.log(id);
        const contactId = parseInt(id, 10);

        if (isNaN(contactId)) {
            return NextResponse.json({ error: 'Invalid Contact Id', }, { status: 500 });
        }

        const contact = await prisma.vectorStore.delete({
            where: {
                id: contactId
            }
        });
        console.log(contact);

        return NextResponse.json({ msg: 'Vector Store Removed Successfully' }, { status: 200 });

    } catch (e) {
        // console.log(e);
        return NextResponse.json({ error: 'Something Went Wrong', e: e }, { status: 500 });
    }

}