import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    try{

        const vector = await prisma.vectorStore.findMany({
        })
        console.log(vector);
        return NextResponse.json({vectors:vector},{status:200});
    }catch(e){
        
        return NextResponse.json({error:'Data Not Found'},{status:500});
    }

}