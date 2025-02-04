import { authOption } from "@/lib/auth"; // Fixed typo in import
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  id: string;
  phone_number: string;
  voice_id: string;
  prompt: string;
  max_duration: number;
  transfer_phone_number: string;
  language: string;
  model: string;
  tools?: any[];
  information?: any;
}

export async function POST(req: NextRequest) {
  const {
    id,
    phone_number,
    voice_id,
    prompt,
    max_duration,
    transfer_phone_number,
    language,
    model,
    tools = [],
    information
  } = await req.json() as RequestBody; // Type assertion for request body

  const session = await getServerSession(authOption); // Fixed authOptions name

  if (!session?.user) {
    return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 }); // More appropriate 401 status
  }

  try {
    const options = {
      headers: {
        Authorization: session.user.key_token, // Ensure proper capitalization for Authorization header
        'Content-Type': 'application/json'
      }
    };

    // Properly merge tools and information without nested arrays
    const mergedTools = [
      ...(information ? [information] : []),
      ...(Array.isArray(tools) ? tools : [])
    ].filter(Boolean);

    const requestData = {
      phone_number,
      voice: voice_id,
      prompt,
      max_duration,
      transfer_phone_number,
      language,
      model,
      tools: mergedTools // Removed redundant ternary
    };

    // Await the API call and handle potential errors
    const response = await axios.post(
      `https://api.bland.ai/v1/inbound/${id}`,
      requestData,
      options
    );

    return NextResponse.json(
      { msg: 'Inbound Agent Updated Successfully' },
      { status: 200 }
    );
  } catch (e) {
    console.error('Error updating inbound agent:', e); // Log error server-side
    return NextResponse.json(
      { error: 'Failed to update inbound agent' }, // Generic client message
      { status: 500 }
    );
  }
}