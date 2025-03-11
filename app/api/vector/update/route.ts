import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import axios from "axios";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { id, name, description, text } = await req.json(); // Extract id, name, description, and text from the request body
  const session = await getServerSession(authOption);

  if (!session?.user) {
    return NextResponse.json({ msg: "Authentication Error" }, { status: 500 });
  }

  try {
    // Step 1: Retrieve the vector store entry from the database using the provided id
    const vectorStore = await prisma.vectorStore.findUnique({
      where: { id: +id }, // Find the vector store by its id
    });

    if (!vectorStore) {
      return NextResponse.json(
        { error: "Vector Store not found" },
        { status: 404 }
      );
    }

    // Step 2: Use the api_key and knowledge_base_id from the vector store to update the knowledge base
    const options = {
      headers: {
        "X-API-Key": vectorStore.api_key, // Use the api_key from the vector store
        "Content-Type": "application/json",
      },
    };

    const requestData = {
      knowledge_base_text: text, // Use knowledge_base_text as per the API specification
    };

    // Make the PUT request to update the knowledge base
    const response = await axios.put(
      `https://lexachat.aireceptionistpro.com/api/knowledge/${vectorStore.knowledge_base_id}`,
      requestData,
      options
    );

    console.log(response.data); // Log the response from the API

    // Step 3: Update the vector store entry in the database (if needed)
    const updatedVectorStore = await prisma.vectorStore.update({
      where: { id: +id },
      data: {
        name: name, // Update the name if provided
        description: description, // Update the description if provided
      },
    });

    console.log(updatedVectorStore); // Log the updated vector store

    return NextResponse.json(
      { msg: "Knowledge Base and Vector Store Updated Successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error updating knowledge base or vector store:", e);
    return NextResponse.json(
      { error: "Something Went Wrong", details: e },
      { status: 500 }
    );
  }
}