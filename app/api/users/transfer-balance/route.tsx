import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { id, balance } = await req.json();
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                id: +id
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User Not Found!' }, { status: 500 });
        }


        const options = {
            method: 'POST',
            headers: {
                authorization: process.env.BLAND_KEY,
                'Content-Type': 'application/json'
            },
            data: {
                amount: +balance,
            }
        };

        const request = await axios.post(`https://api.bland.ai/v1/subaccounts/${user.subaccount_id}/transfer`, options.data, { headers: options.headers });



        return NextResponse.json({ msg: 'Funds Transferred Succesfully' }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }

}