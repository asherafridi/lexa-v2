import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    const contact = await prisma.contact.findMany({
        where:{
            userId : +session?.user?.id
        },
        select:{
            contactGroup : {
                select:{
                    name:true
                }
            },
            name :true,
            number:true,
            id: true
        }
    });
    return NextResponse.json({contacts:contact},{status:200});

}