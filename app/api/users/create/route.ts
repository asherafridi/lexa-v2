import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';
import { hashPass } from '@/lib/hash';

export async function POST(req: NextRequest) {
    const { name, email,password,balance } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (user) {
            return NextResponse.json({ error: 'User Email already existed.' }, { status: 500 });
        }


        const options = {
            method: 'POST',
            headers: {
                authorization: process.env.BLAND_KEY,
                'Content-Type': 'application/json'
            },
            data: {
                balance: +balance,
                first_name: name,
                last_name: email,
                login_enabled: false
            }
        };

        const request = await axios.post('https://api.bland.ai/v1/subaccounts', options.data, { headers: options.headers });

        console.log(request);


        const hashPassword = await hashPass(password);

            const newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    status : true,
                    password : hashPassword,
                    subaccount_id : request.data.subaccount_id,
                    subaccount_key : request.data.subaccount_key
                }
            });

            return NextResponse.json({ msg: 'User Created Successfully' }, { status: 200 });
   
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }

}