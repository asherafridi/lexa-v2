import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest ,res : NextResponse) {

    const session = await getServerSession(authOption);

    const options = {
        method: 'GET',
        headers: {
          authorization: process.env.BLAND_KEY
        }
      };

        // Make the POST request and wait for the response
        const response = await axios.get('https://api.bland.ai/v1/me', { headers: options.headers });
        

    return NextResponse.json({balance:response.data.billing.current_balance},{status:200});

}