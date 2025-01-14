import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { name } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        const user = await prisma.contactGroup.findFirst({
            where: {
                name: name,
                userId: +session?.user?.id
            }
        });

        if (user) {
            return NextResponse.json({ error: 'Group already existed.' }, { status: 500 });
        } else {

            const contact = await prisma.contactGroup.create({
                data: {
                    name: name,
                    userId: +session?.user?.id
                }
            });

            return NextResponse.json({ msg: 'Group Created Successfully' }, { status: 200 });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }

}