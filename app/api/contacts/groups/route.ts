import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { group } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    const group = await prisma.contactGroup.findMany({
        where:{
            userId : +session?.user?.id
        }
    });
    return NextResponse.json({groups:group},{status:200});

}