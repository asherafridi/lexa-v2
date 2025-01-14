import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { id, name } = await req.json();
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const user = await prisma.contactGroup.findFirst({
            where: {
                name: name,
                userId: +session?.user?.id,
                id: {
                    not: +id // Use the "not" operator to check inequality
                }
            }
        });

        if (user) {
            return NextResponse.json({ error: 'Group already existed.' }, { status: 500 });
        } 

            const group = await prisma.contactGroup.update({
                data: {
                    name: name,
                    userId: +session?.user?.id
                },
                where:{
                    id : +id
                }
            });

       


        return NextResponse.json({ msg: 'Group Updated Successfully' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }

}