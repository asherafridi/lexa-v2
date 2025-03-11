import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { agentId, contactId, duration } = await req.json();
  const session = await getServerSession(authOption);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const agent = await prisma.agent.findFirst({
      where: {
        id: +agentId,
      },
    });
    const contact = await prisma.contact.findFirst({
      where: {
        id: +contactId,
      },
    });

    if (!agent || !contact) {
      return NextResponse.json(
        { error: "Agent or Contact not found" },
        { status: 404 }
      );
    }

    const tool2 = [`${agent.tools}`];

    let dynamicData: any = [];

    if (agent?.vector) {
      const vectorStore = await prisma.vectorStore.findUnique({
        where: { id: +agent.vector },
      });

      if (vectorStore) {
        dynamicData = [
          {
            url: `https://lexachat.aireceptionistpro.com/api/knowledge/${vectorStore.knowledge_base_id}`,
            method: "GET",
            headers: [
              {
                key: "Content-Type",
                value: "application/json",
              },
              {
                key: "X-API-Key",
                value: vectorStore.api_key,
              },
            ],
            query: [],
            cache: true,
            response_data: [
              {
                context: "knowledge_base_context",
                data: "$.knowledge_base_text",
                name: "knowledge_base_data",
              },
            ],
          },
        ];
      }
    }

    const options = {
      headers: {
        authorization: session.user.key_token,
        "Content-Type": "application/json",
      },
      data: {
        phone_number: contact.number,
        task: agent.prompt,
        voice: agent.voice,
        background_track: agent?.backgroundTrack ,
        first_sentence: agent.firstSentence,
        wait_for_greeting: agent.waitForGreeting,
        record: true,
        max_duration: agent.maxDuration ? +agent.maxDuration : 1,
        answered_by_enabled: true,
        from: agent.numberId,
        tools: dynamicData.length > 0 ? dynamicData : tool2,
      },
    };

    const response = await axios.post(
      "https://api.bland.ai/v1/calls",
      options.data,
      { headers: options.headers }
    );

    console.log(response.data);
    return NextResponse.json({ msg: "Calling..." }, { status: 200 });
  } catch (e) {
    console.error("Error in POST request:", e);
    return NextResponse.json(
      { error: "Something Went Wrong!", details: e || e },
      { status: 500 }
    );
  }
}