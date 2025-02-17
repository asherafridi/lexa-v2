import prisma from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Configure timeout (in milliseconds)
const AXIOS_TIMEOUT = 10000; // 10 seconds
const DATABASE_TIMEOUT = 5000; // 5 seconds

function setCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: setCorsHeaders() });
}

export async function POST(req: NextRequest) {
  try {
    const { id, message } = await req.json();

    // Add database timeout
    const user = await prisma.user.findFirst({
      where: { id: +id },
    }).catch((error) => {
      console.error('Database error:', error);
      throw new Error('Database operation failed');
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: setCorsHeaders() }
      );
    }

    // Validate required fields
    if (!user.knowledgeBaseId || !user.apiKey) {
      return NextResponse.json(
        { error: "Missing required user configuration" },
        { status: 400, headers: setCorsHeaders() }
      );
    }

    const response = await axios.post(
      `https://lexachat.aireceptionistpro.com/api/chat/${user.knowledgeBaseId}`,
      { 
        message: message,
        user_id: user.userId || undefined // Send undefined instead of null
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": user.apiKey,
        },
        timeout: AXIOS_TIMEOUT
      }
    );

    
    return NextResponse.json(
      { ans:  response.data.response},
      { status: 200, headers: setCorsHeaders() }
    );

  } catch (error) {
    console.error('API Error:', error);


    return NextResponse.json(
      { 
        error: error
      },
      { 
        status: 500,
        headers: setCorsHeaders() 
      }
    );
  }
}