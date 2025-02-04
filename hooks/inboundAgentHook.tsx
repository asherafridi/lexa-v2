import axios from "axios";
import { useEffect, useState } from "react";


interface InboundAgent {
    phone_number : string;
    name:string;
    description:string;
    text:string;
    first_sentence : string;
    voice : string;
    prompt : string;
    max_duration : number;
    transfer_phone_number : string;
    language : string;
    model : string;
    background_track : string;
  }

const useInboundAgentsFetch = ()=>{
    const [vector, setVectors] = useState([]);
    const [vectorLoader, setVectorLoader] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/inbound-agent');
          setVectors(response.data.inbound);
          setVectorLoader(false);
          
        } catch (error) {
          setVectorLoader(false);
          console.log(error);
        }
      };
  
      fetchData();
    }, ['']);
  
    return { vector, vectorLoader };
}

const useInboundAgentDetail = (id:string)=>{

    const [agent, setVectors] = useState<InboundAgent>();
    const [agentLoader, setVectorLoader] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`/api/inbound-agent/read`,{id :id});
          
          setVectors(response.data.inbound);
          setVectorLoader(false);
          
        } catch (error) {
          setVectorLoader(false);
          console.log(error);
        }
      };
  
      fetchData();
    }, ['']);
  
    return { agent, agentLoader };
  }

export {useInboundAgentsFetch, useInboundAgentDetail}