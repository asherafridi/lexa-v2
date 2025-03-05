import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StringValidation } from "zod";


interface Agent {
  id:string;
  name:string;
  agentType:string;
  voice : string;
  numberId : string;
  prompt : string;
  backgroundTrack:string;
  number : any;
  firstSentence : string;
  waitForGreeting : string;
  maxDuration : string;
  transferNumber : string;
  language : string;
  model :string;
  tools :string;
  vector : string;
}
const useAllAgentFetch = () => {
    const [data, setData] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/agent');
          setData(response.data.agents);
          setLoading(false);
          
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
  
      fetchData();
    }, ['']);
  
    return { data, loading };
  };

const useFetchAgent = (id: string) => {
    const [loader,setLoader] = useState(true);
    const [data,setData] = useState<Agent>();
    useEffect(() => {
        axios.post(`/api/agent/read`, {
            id: id
        })
            .then(response => {
                setData(response.data.agent);
                setLoader(false);
            })
            .catch(error => {
                console.error('Error fetching contact:', error);
                setLoader(false);
            });
    }, [id]);
    return {data,loader};
};

const agentDelete = async (id: string): Promise<void> => {
    try {
      const response = await axios.post(`/api/agent/remove`, { id });
      toast.success(response?.data?.msg);
      setTimeout(()=>{window.location.reload()},1000);
    } catch (error:any) {
      toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
    }
  };
  interface Voice {
    id: string;
    name: string;
    description: string;
  }
  
  interface UseFetchVoiceResult {
    voice: Voice[];
    voiceLoader: boolean;
  }

  const useFetchVoice = (): UseFetchVoiceResult => {
    const [voice, setVoice] = useState<Voice[]>([]);
    const [voiceLoader, setVoiceLoader] = useState<boolean>(true);
  
    const session = useSession();
  
    useEffect(() => {
      const fetchVoices = async () => {
        try {
          const options = {
            headers: {
              authorization: session.data?.user.key_token || "", // Default to an empty string if key_token is undefined
            },
          };
  
          const response = await axios.get("https://api.bland.ai/v1/voices", options);
          setVoice(response.data.voices);
        } catch (error) {
          console.error("Error fetching voices:", error);
        } finally {
          setVoiceLoader(false);
        }
      };
  
      if (session.data?.user.key_token) {
        fetchVoices();
      } else {
        console.warn("No key token available for authorization");
        setVoiceLoader(false);
      }
    }, [session.data?.user.key_token]);
  
    return { voice, voiceLoader };
  };
  

  interface Number {
    id : string;
    number:string;
  }
  const useFetchNumber=  ()=>{
    const [number,setNumber] =useState<Number[]>([]);
    const [numberLoader,setNumberLoader] = useState(true);

    useEffect(()=>{
    
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/number');
          setNumber(response.data.numbers);
          setNumberLoader(false);
          
        } catch (error) {
          setNumberLoader(false);
          console.log(error);
        }
      };
  
      fetchData();
    },[]);
    return {number,numberLoader};
  }

  

export { useFetchAgent,useAllAgentFetch ,agentDelete,useFetchVoice,useFetchNumber};