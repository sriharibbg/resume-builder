import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getTemplateDetails } from "../api";
import MainSpinner from "../components/MainSpinner";
import { FaHouse } from "react-icons/fa6";
import {
  BiFolderPlus,
  BiHeart,
  BiSolidFolderPlus,
  BiSolidHeart,
} from "react-icons/bi";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import apis from "../apis/apis";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence } from "framer-motion";
import { TemplateDesignPin } from "../components";

const TemplateDesignPinDetails = () => {
  const { templateId } = useParams();
  const { data: user, refetch: userRefetch } = useUser();
  const {
    data: templates,
    refetch: temp_refetch,
    isLoading: temp_isLoading,
  } = useTemplates();

  // ✅ Add to Collections
  const addToCollection = async (e) => {
    e.stopPropagation();

    try {
      const userId =  user?.uid;
      if (!userId) return toast.error("User not authenticated");
      if (!data?._id) return toast.error("Invalid template data");
      console.log(userId)

      const { data: res } = await apis.post("/saveToCollections", {
        uid: userId,
        dataId: data._id,
      });

      toast.success(res.message);
      userRefetch();
    } catch (err) {
      console.error("Error adding to collection:", err);
      toast.error(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  // ✅ Save to Favourites
  const saveToFavourites = async (e) => {
    e.stopPropagation();

    try {
      const userId = user?._id || user?.uid;
      if (!userId) return toast.error("User not authenticated");
      if (!data?._id) return toast.error("Invalid template data");

      const { data: res } = await apis.post("/saveToFavourites", {
        userId,
        templateId: data._id,
      });

      toast.success(res.message);
      await Promise.all([temp_refetch(), refetch()]);
    } catch (err) {
      console.error("Error saving to favourites:", err);
      toast.error(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  // ✅ Fetch template details
  const {
    data,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["template", templateId],
    queryFn: () => getTemplateDetails(templateId),
    enabled: !!templateId,
  });

  if (isLoading) return <MainSpinner />;

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-red-500">
        <p className="text-lg text-txtPrimary font-semibold">
          Error loading template...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start px-4 py-12">
      {/* 🧭 Breadcrumb */}
      <div className="w-full flex items-center pb-8 gap-2">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-2 text-txtPrimary"
        >
          <FaHouse /> Home
        </Link>
        <p>/</p>
        <p>{data?.title}</p>
      </div>

      {/* 🔳 Main layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= LEFT SECTION ================= */}
        <div
          className="col-span-1 lg:col-span-8 
          bg-gray-100 shadow-md rounded-2xl 
          p-5 m-5 flex flex-col items-start justify-start gap-6"
        >
          {/* Template Image */}
          <img
            className="w-full h-auto object-contain rounded-md shadow-sm"
            src={data?.imageUrl}
            alt={data?.title}
          />

          {/* Template Title & Actions */}
          <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex items-center justify-between">
              <p className="text-xl font-semibold text-txtPrimary">
                {data?.title}
              </p>

              {/* Likes count */}
              {data?.favourites?.length > 0 && (
                <div className="flex items-center justify-center gap-1">
                  <BiSolidHeart className="text-base text-red-500" />
                  <p className="text-base text-txtPrimary font-semibold">
                    {data.favourites.length} Likes
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            {user && (
              <div className="flex items-center flex-wrap gap-3">
                {/* ✅ Collections Button */}
                {user?.collections?.includes(data?._id) ? (
                  <div
                    onClick={addToCollection}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiSolidFolderPlus className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Remove From Collections
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={addToCollection}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiFolderPlus className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Add to Collections
                    </p>
                  </div>
                )}

                {/* ✅ Favourites Button */}
                {data?.favourites?.includes(user?._id) ? (
                  <div
                    onClick={saveToFavourites}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiSolidHeart className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Remove From Favourites
                    </p>
                  </div>
                ) : (
                  <div
                    onClick={saveToFavourites}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiHeart className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Add to Favourites
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6">
          {/* 🌎 Discover More */}
          <div
            className="w-full h-72 bg-blue-200 rounded-md overflow-hidden relative"
            style={{
              background:
                "url(https://cdn.pixabay.com/photo/2023/10/04/03/04/ai-generated-8292699P_1280.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
              <Link
                to={"/"}
                className="px-4 py-2 rounded-md border-2 border-gray-50 text-white"
              >
                Discover more
              </Link>
            </div>
          </div>

          {/* ✏️ Edit Template */}
          {user && (
            <Link to={`/resume/${data?.name}?templateId=${templateId}`}>
              <p className="text-white font-semibold text-lg bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Edit this template
              </p>
            </Link>
          )}
          {/** */}
          <div className="w-full flex items-center justify-start flex-wrap gap-2">
            {data?.tags?.split(',').map((tag,index)=>{
             return  <p className="text-xs border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap" key={index}>{tag}</p>
            })}
          </div>
        </div>
      </div>
      {/**similar templates */}
      {templates?.filter((temp)=>temp._id!==data?._id).length>0 &&<div className="w-full py-8 flex flex-col items-start justify-start gap-4">
<p className="text-lg font-semibold text-txtDark">you might also like</p>
<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
>
<React.Fragment>
  <AnimatePresence>
    {templates?.filter((temp)=>temp._id!==data?._id).map((template,index)=>(
      <TemplateDesignPin
      key={template?.P_id} data={template} index={index}
      ></TemplateDesignPin>
    ))}
  </AnimatePresence>
</React.Fragment>

</div>
      </div>
}x``
    </div>
  );
};

export default TemplateDesignPinDetails;
