import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify";

const useTemplates=()=>{
    const { data, isLoading, isError, refetch } = useQuery({
       queryKey: ["templates"], // ✅ must be array in v5
       queryFn: async () => {
         try {
           const templates=null//await getTemplates();
           return templates;
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
   
   export default useTemplates;
   