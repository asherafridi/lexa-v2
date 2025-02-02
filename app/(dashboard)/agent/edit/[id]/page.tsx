"use client";
import Breadcrumb from "@/components/Breadcrumb";
import FormButton from "@/components/FormButton";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetchAgent, useFetchVoice } from "@/hooks/agentHook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNumberFetch } from "@/hooks/numberHook";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { useToolsFetch, useVectorFetch } from "@/hooks/vectorHook";

interface AgentData {
  id: string;
  name: string;
  voice: string;
  numberId: string;
  firstSentence: string;
  waitForGreeting: boolean;
  prompt: string;
  maxDuration: number;
  transferNumber: string;
  language: string;
  model: string;
  information?: string;
  tools?: string;
}

interface Voice {
  id: string;
  name: string;
  description: string;
}

interface PhoneNumber {
  phone_number: string;
}

interface Vector {
  vector_id: string;
  name: string;
  description: string;
}

interface Tool {
  tool_id: string;
  tool: {
    name: string;
  };
}

const Page = ({ params }: { params: { id: string } }) => {
  const { data, loader } = useFetchAgent(params.id);
  const { voice, voiceLoader } = useFetchVoice();
  const { number, numberLoader } = useNumberFetch();
  const { vector, vectorLoader } = useVectorFetch();
  const { tools, toolsLoader } = useToolsFetch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: "",
    voice: "",
    numberId: "",
    first_sentence: "",
    wait_for_greeting: "false",
    prompt: "",
    max_duration: "",
    transfer_number: "",
    language: "en-us",
    model: "enhanced",
    information: "",
    tools: "",
  });

  useEffect(() => {
    if (data) {
      setFormState({
        name: data.name || "",
        voice: data.voice || "",
        numberId: data.numberId || "",
        first_sentence: data.firstSentence || "",
        wait_for_greeting: data.waitForGreeting ? "true" : "false",
        prompt: data.prompt || "",
        max_duration: data.maxDuration?.toString() || "",
        transfer_number: data.transferNumber || "",
        language: data.language || "en-us",
        model: data.model || "enhanced",
        information: data.vector || "",
        tools: data.tools || "",
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/agent/update", {
        ...formState,
        id: params.id,
      });

      toast.success(response.data?.msg);
      setTimeout(() => {
        router.push("/agent");
      }, 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "An error occurred");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  if (loader || numberLoader || voiceLoader || vectorLoader || toolsLoader) {
    return <Skeleton className="w-full h-[400px] rounded mt-4" />;
  }

  return (
    <div className="p-5 min-h-screen">
      <Breadcrumb />
      <div className="bg-background border mt-4 rounded p-4">
        <form onSubmit={handleSubmit} className="flex w-full flex-wrap">
           {/* Name Field */}
           <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="text-sm font-medium mb-2 block">Name</label>
            <Input
              name="name"
              placeholder="Agent Name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Voice Select */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="text-sm font-medium mb-2 block">Voice</label>
            <Select
              value={formState.voice}
              onValueChange={(value) => handleSelectChange("voice", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voice.map((v, index) => (
                  <SelectItem key={index} value={v.id}>
                    {v.name} - {v.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Number Select */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <label className="text-sm font-medium mb-2 block">Number</label>
            <Select
              value={formState.numberId}
              onValueChange={(value) => handleSelectChange("numberId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {number.map((n, index) => (
                  <SelectItem key={index} value={n.phone_number}>
                    {n.phone_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* First Sentence */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-2">
            <label className="text-sm font-medium mb-2 block">
              First Sentence
            </label>
            <Input
              name="first_sentence"
              placeholder="First Sentence"
              value={formState.first_sentence}
              onChange={handleInputChange}
            />
          </div>

          {/* Wait for Greeting */}
          <div className="w-full md:w-1/2 lg:w-1/2 p-2">
            <label className="text-sm font-medium mb-2 block">
              Wait For Greeting
            </label>
            <Select
              value={formState.wait_for_greeting}
              onValueChange={(value) =>
                handleSelectChange("wait_for_greeting", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prompt Textarea */}
          <div className="w-full mb-4">
            <label className="text-sm font-medium mb-2 block">Prompt</label>
            <Textarea
              name="prompt"
              placeholder="Type your prompt here...."
              value={formState.prompt}
              onChange={handleInputChange}
              className="w-full"
              rows={10}
            />
            <div className="text-right mt-2">
              <a className="text-blue-800" href="">
                Prompt Guide
              </a>
            </div>
          </div>

                {/* Max Duration */}
                <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <label className="text-sm font-medium mb-2 block">
                    Max Duration
                  </label>
                  <Input
                    name="max_duration"
                    placeholder="Max Duration"
                    value={formState.max_duration}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Transfer Number */}
                <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <label className="text-sm font-medium mb-2 block">
                    Transfer Number
                  </label>
                  <Input
                    name="transfer_number"
                    placeholder="Transfer Call to"
                    value={formState.transfer_number}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Language Select */}
                <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <label className="text-sm font-medium mb-2 block">
                    Language
                  </label>
                  <Select
                    value={formState.language}
                    onValueChange={(value) =>
                      handleSelectChange("language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-us">English</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="el">Greek</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="ko">Korean</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                      <SelectItem value="nl">Dutch</SelectItem>
                      <SelectItem value="pl">Polish</SelectItem>
                      <SelectItem value="ru">Russian</SelectItem>
                      <SelectItem value="sv">Swedish</SelectItem>
                      <SelectItem value="da">Danish</SelectItem>
                      <SelectItem value="fi">Finnish</SelectItem>
                      <SelectItem value="id">Indonesian</SelectItem>
                      <SelectItem value="ms">Malay</SelectItem>
                      <SelectItem value="tr">Turkish</SelectItem>
                      <SelectItem value="uk">Ukrainian</SelectItem>
                      <SelectItem value="bg">Bulgarian</SelectItem>
                      <SelectItem value="cs">Czech</SelectItem>
                      <SelectItem value="ro">Romanian</SelectItem>
                      <SelectItem value="sk">Slovak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Model Select */}
                <div className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <label className="text-sm font-medium mb-2 block">
                    Model
                  </label>
                  <Select
                    value={formState.model}
                    onValueChange={(value) =>
                      handleSelectChange("model", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enhanced">Enhanced</SelectItem>
                      <SelectItem value="gpt4">GPT 4</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="turbo">Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

          {/* Information Select */}
          <div className='w-full md:w-full lg:w-1/2 p-2'>
            <Label>Company Information</Label>
            <Select
              value={formState.information}
              onValueChange={(value) => handleSelectChange('information', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select information" />
              </SelectTrigger>
              <SelectContent>
                {(vector || []).map((element: Vector) => (
                  <SelectItem key={element.vector_id} value={element.vector_id}>
                    {element.name} - {element.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tools Select */}
          <div className='w-full md:w-full lg:w-1/2 p-2 pb-4'>
            <Label>Tools</Label>
            <Select
              value={formState.tools}
              onValueChange={(value) => handleSelectChange('tools', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tool" />
              </SelectTrigger>
              <SelectContent>
                {(tools || []).map((element: Tool) => (
                  <SelectItem key={element.tool_id} value={element.tool_id}>
                    {element.tool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormButton state={loading} />
        </form>
      </div>
    </div>
  );
};

export default Page;