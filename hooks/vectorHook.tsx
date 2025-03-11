import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Vector {
  id : string;
  name:string;
  description:string;
  text:string;
}

interface Tool {
  tool_id : string;
  tool:any;
}

const useVectorFetch = ()=>{
  const [vector, setVectors] = useState<Vector[]>([]);
  const [vectorLoader, setVectorLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/vector');
        console.log(response.data);
        setVectors(response.data.vectors);
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

const useToolsFetch = ()=>{
  const [tools, setVectors] = useState<Tool[]>([]);
  const [toolsLoader, setVectorLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tools');
        setVectors(response.data.tools);
        setVectorLoader(false);
        
      } catch (error) {
        setVectorLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { tools, toolsLoader };
}

const useFetchVectorDetail = (id:string)=>{

  const [vector, setVectors] = useState<Vector>();
  const [vectorLoader, setVectorLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/vector/read`,{id :id});
        console.log(response.data.vector);
        setVectors(response.data.vector);
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


const useVectorDelete = async (id: string): Promise<void> => {
  try {
    const response = await axios.post(`/api/vector/delete`, { id });
    toast.success(response?.data?.msg);
    setTimeout(()=>{
        window.location.reload();
    },1000);
  } catch (error:any) {
    toast.error(error?.data?.error || 'An error occurred while deleting the Vector.');
  }
};
export {useVectorFetch,useFetchVectorDetail,useVectorDelete, useToolsFetch};