import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const  {id}  = await req.json();
    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    try{

        const vectorId = await prisma.vectorStore.findFirstOrThrow({
            where:{
                id: +id
            }
        });

        const response = await axios.get(
            `https://lexachat.aireceptionistpro.com/api/knowledge/${vectorId.knowledge_base_id}`,
            {
              headers: {
                "X-API-Key": vectorId.api_key, // Ensure headers are passed correctly
              },
            }
          );
        const vector = {
            vector_id : vectorId.id,
            name : vectorId.name,
            description: vectorId.description,
            text : response.data.knowledge_base_text
        }
        return NextResponse.json({vector:vector},{status:200});
    }catch(e){
        
        return NextResponse.json({error:'Data Not Found'},{status:500});
    }

}