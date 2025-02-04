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
import { useFetchVoice } from "@/hooks/agentHook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInboundAgentDetail } from "@/hooks/inboundAgentHook";
import { useToolsFetch, useVectorFetch } from "@/hooks/vectorHook";
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ params }: { params: { id: string } }) => {
  const { voice } = useFetchVoice();
  const [loading, setLoading] = useState(false);
  const { agent, agentLoader } = useInboundAgentDetail(params.id);
  const { vector } = useVectorFetch();
  const { tools } = useToolsFetch();
  const router = useRouter();

  // Form states
  const [voiceId, setVoiceId] = useState("");
  const [firstSentence, setFirstSentence] = useState("");
  const [prompt, setPrompt] = useState("");
  const [maxDuration, setMaxDuration] = useState(1);
  const [transferNumber, setTransferNumber] = useState("");
  const [language, setLanguage] = useState("");
  const [model, setModel] = useState("");
  const [information, setInformation] = useState("");
  const [selectedTool, setSelectedTool] = useState("");

  console.log(agent);
  useEffect(() => {
    if (agent) {
      setVoiceId(agent.voice || "");
      setFirstSentence(agent.first_sentence || "");
      setPrompt(agent.prompt || "");
      setMaxDuration(agent.max_duration || 1);
      setTransferNumber(agent.transfer_phone_number || "");
      setLanguage(agent.language || "");
      setModel(agent.model || "");
    }
  }, [agent, voice, vector]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`/api/inbound-agent/update`, {
        voice_id: voiceId,
        first_sentence: firstSentence,
        prompt,
        max_duration: maxDuration,
        transfer_phone_number: transferNumber,
        language,
        model,
        information,
        tools: selectedTool,
        id: params.id,
      })
      .then((response) => {
        toast.success(response.data?.msg);
        setTimeout(() => {
          setLoading(false);
          router.push("/inbound-agent");
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.response.data?.error);
        setLoading(false);
      });
  };

  if (agentLoader) {
    return <Skeleton className="w-full h-[400px] rounded mt-4" />;
  }

  return (
    <div className="p-5 min-h-screen">
      <div className="bg-background border mt-4 rounded p-4">
        <form onSubmit={handleSubmit} className="flex w-full flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/2 p-2">
            <label className="block text-sm font-medium mb-1">Voice</label>
            <Select value={voiceId} onValueChange={setVoiceId}>
              <SelectTrigger>
                <SelectValue placeholder="Voice" />
              </SelectTrigger>
              <SelectContent>
                {voice.map((element, index) => (
                  <SelectItem key={index} value={element?.name}>
                    {element?.name} - {element?.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/2 p-2">
            <label className="block text-sm font-medium mb-1">
              First Sentence
            </label>
            <Input
              placeholder="First Sentence"
              value={firstSentence}
              onChange={(e) => setFirstSentence(e.target.value)}
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1">Prompt</label>
            <Textarea
              placeholder="Type your prompt here...."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
              rows={10}
            />
            <div className="text-right mt-1">
              <a className="text-blue-800" href="">
                Prompt Guide
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <label className="block text-sm font-medium mb-1">
              Max Duration
            </label>
            <Input
              placeholder="Max Duration"
              value={maxDuration}
              onChange={(e) => setMaxDuration(+e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <label className="block text-sm font-medium mb-1">
              Transfer Number
            </label>
            <Input
              placeholder="Transfer Call to"
              value={transferNumber}
              onChange={(e) => setTransferNumber(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <label className="block text-sm font-medium mb-1">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
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

          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <label className="block text-sm font-medium mb-1">Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enhanced">Enhanced</SelectItem>
                <SelectItem value="gpt4">GPT 4</SelectItem>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="turbo">Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full p-2">
            <label className="block text-sm font-medium mb-1">
              Company Information
            </label>
            <Select value={information} onValueChange={setInformation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Information" />
              </SelectTrigger>
              <SelectContent>
                {vector.map((element, index) => (
                  <SelectItem key={index} value={element?.vector_id}>
                    {element?.name} - {element?.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full p-2">
            <label className="block text-sm font-medium mb-1">Tools</label>
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger>
                <SelectValue placeholder="Select Tool" />
              </SelectTrigger>
              <SelectContent>
                {tools.map((element, index) => (
                  <SelectItem key={index} value={element?.tool_id}>
                    {element?.tool?.name}
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
