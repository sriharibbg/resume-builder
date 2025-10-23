import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUserDetail } from "../api";

const useUser = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["user"], // ✅ must be array in v5
    queryFn: async () => {
      try {
        const userDetail = await getUserDetail();
        console.log("---====>>>>")
        console.log(userDetail)
        console.log(";;;;;;;;;;;;;;;")
        return userDetail;
      } catch (err) {
        if (err instanceof Error && !err.message.includes("not authenticated")) {
          toast.error("Something went wrong....."); // ✅ toast.error instead of toast.err
        }
        throw err; // ✅ rethrow so React Query knows it failed
      }
    },
    refetchOnWindowFocus: false, // ✅ correct placement
  });

  return { data, isLoading, isError, refetch };
};

export default useUser;


/*import {useQuery} from '@tanstack/react-query'
import { toast } from 'react-toastify';
import { getUserDetail } from '../api';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useUser = () => {
const{data,isLoading,isError,refetch}=  
  useQuery("uer",async () =>{

    try{

        const userDetail=await getUserDetail();
        return userDetail
    }catch(err){
    if(!err.message.includes("not authenticated"))
    {
        toast.err("Something went wrong.....")
    }
    }
    },{refetchOnWindowFocus: false}

);
return {data,isLoading,isError,refetch}
}

export default useUser
*/