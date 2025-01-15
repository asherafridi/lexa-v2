import prisma from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Middleware to add CORS headers
function setCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // Set to your frontend domain for security
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: setCorsHeaders() });
}

export async function POST(req: NextRequest) {
  const { id, message } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      id: +id,
    },
  });

  
  const response = await axios.post(
    `http://46.202.179.35:83/api/chat/${user?.knowledgeBaseId}`,
    { 
      message: message, 
      user_id : user?.userId
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": user?.apiKey,
      },
    }
  );

  
  console.log(response.data);

  return NextResponse.json(
    { ans: response.data.response
     },
    {
      status: 200,
      headers: setCorsHeaders(),
    }
  );
}
