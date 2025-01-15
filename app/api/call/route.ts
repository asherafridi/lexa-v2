import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 });
    }

    const callType = req.nextUrl.searchParams.get('inbound');
    const batch = req.nextUrl.searchParams.get('batch');
    const startDate = req.nextUrl.searchParams.get('start_date');
    const endDate = req.nextUrl.searchParams.get('end_date');

    const params = {
        inbound: callType,
        batch_id: batch,
        start_date: startDate,
        end_date: endDate,
    };

    try {
        const options = {
            method: 'GET',
            headers: {
                authorization: `${session.user.key_token}`,
            },
            params, // Pass params here
        };

        const response = await axios.get('https://api.bland.ai/v1/calls', options);
        console.log(response?.data?.message);
        return NextResponse.json({ calls: response.data?.calls }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching calls:', error);
        const errorMessage = error.response?.data?.message || 'Data Not Found';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
