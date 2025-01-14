import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface Group {
    id:string;
    name:string;
}
const useAllGroupFetch = () => {
  const [group, setGroup] = useState<Group[]>([]);
  const [groupLoader, setContactLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/contacts/groups');
        setGroup(response.data.groups);
        setContactLoader(false);
        
      } catch (error) {
        setContactLoader(false);
        console.log(error);
      }
    };

    fetchData();
  }, ['']);

  return { group, groupLoader,setGroup };
};


  
const useGroupDelete = async (id: string): Promise<void> => {
    try {
      const response = await axios.post(`/api/contacts/groups/remove`, { id });
      toast.success(response?.data?.msg);
    } catch (error:any) {
      toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
    }
  };

  export { useGroupDelete, useAllGroupFetch};