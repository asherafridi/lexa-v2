import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Contact {
    id:string;
    name:string;
    number:string;
    contactGroup:any;
}
const useAllContactFetch = () => {
  const [contact, setContact] = useState<Contact[]>([]);
  const [contactLoader, setContactLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/contacts');
        setContact(response.data.contacts);
        setContactLoader(false);
        
      } catch (error) {
        setContactLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { contact, contactLoader,setContact };
};

const useAllContactFetchByGroup = (groupId="") => {
  const [contact, setContact] = useState<Contact[]>([]);
  const [contactLoader, setContactLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/contacts/filter?groupId=${groupId}`);
        setContact(response.data.contacts);
        setContactLoader(false);
        
      } catch (error) {
        setContactLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, [groupId]);

  return { contact, contactLoader,setContact };
};


  
const useContactDelete = async (id: string): Promise<void> => {

    try {
      const response = await axios.post(`/api/contacts/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      console.log(error);
      toast.error(error?.response?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  export { useContactDelete, useAllContactFetch,useAllContactFetchByGroup};