import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apis from "../apis/apis";

// ❌ WRONG: const useTemplates = () => {
// ✅ FIXED: must match your import name in Filters.jsx
const useFilters = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["globalFilter"], // ✅ correct
    // ❌ Broken syntax: comment after function definition breaks code
    // queryFn: async () => ({ searchTerm:''})/*
    // ✅ FIXED:
    queryFn: async () => ({ searchTerm: "" }),
    // You can keep your old API logic commented below if needed:
    /*
    try {
      const templates = await apis.post("/get-templates");
      return templates.data.templates;
    } catch (err) {
      if (err instanceof Error && !err.message.includes("not authenticated")) {
        toast.error("Something went wrong.....");
      }
      throw err;
    }
    */
    refetchOnWindowFocus: false, // ✅ correct placement
  });

  return { data, isLoading, isError, refetch };
};

// ❌ Wrong export name in your old code
// export default useTemplates;
// ✅ FIXED:
export default useFilters;
