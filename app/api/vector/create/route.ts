import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import axios from "axios";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name,description, text } = await req.json(); // Parse the JSON string back into an object
  const session = await getServerSession(authOption);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const requestData = {
      text: `${text}`,
    };

    const request = await axios.post(
      "https://lexachat.aireceptionistpro.com/api/knowledge",
      requestData
    );
    console.log(request.data);

    const vector = await prisma.vectorStore.create({
      data: {
        name: name,
        description: description,
        a_user_id: request.data.user_id,
        api_key: request.data.api_key,
        knowledge_base_id: request.data.knowledge_base_id,
        userId: +session.user.id
      },
    });
    console.log(vector);
    return NextResponse.json({ msg: "Vector Store Created" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong!", details: e },
      { status: 500 }
    );
  }
}
