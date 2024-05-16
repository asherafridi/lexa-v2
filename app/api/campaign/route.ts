import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    const contact = await prisma.campaigns.findMany({
        where:{
            userId : +session?.user?.id
        },
        include:{
            agent:{
                
            }
        },
        orderBy:{
            id: 'desc'
        }
    });
    return NextResponse.json({agents:contact},{status:200});

}