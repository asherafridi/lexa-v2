import prisma from "@/lib/db";
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
  const { id, msg } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      id: +id,
    },
  });

  return NextResponse.json(
    { ans: `Hi ${user?.name}, your email address is ${user?.email}` },
    {
      status: 200,
      headers: setCorsHeaders(),
    }
  );
}
