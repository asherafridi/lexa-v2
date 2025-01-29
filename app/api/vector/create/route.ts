import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { name, description, text } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const options = {
            headers: {
                authorization: session.user.key_token,
                'Content-Type': 'application/json'
            }
        };
        const requestData = {
            name: name,
            description: description,
            text: `${text}`
        };

        const request = await axios.post('https://api.bland.ai/v1/knowledgebases', requestData, options);
        console.log(request.data);
        return NextResponse.json({ msg: 'Vector Store Created' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: 'Something went wrong!', details: e }, { status: 500 });
    }
}
