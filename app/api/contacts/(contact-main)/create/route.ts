import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { name, number,groupId } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        const user = await prisma.contact.findFirst({
            where: {
                number: number,
                userId: +session?.user?.id,
                groupId: +groupId
            }
        });

        if (user) {
            return NextResponse.json({ error: 'Contact already existed.' }, { status: 500 });
        } else {

            const contact = await prisma.contact.create({
                data: {
                    name: name,
                    number: number,
                    userId: +session?.user?.id,
                    groupId:+groupId
                }
            });

            return NextResponse.json({ msg: 'Contact Created Successfully' }, { status: 200 });
        }
    } catch (e) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }

}