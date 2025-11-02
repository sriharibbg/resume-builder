import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getTemplateDetails } from "../api";
import MainSpinner from "../components/MainSpinner";
import { FaHouse } from 'react-icons/fa6'
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import apis from "../apis/apis";
import useTemplates from "../hooks/useTemplates";

const TemplateDesignPinDetails = () => {
  const { templateId } = useParams();
  console.log("<><><?????templateId")
  console.log()
  console.log(templateId)
  const {data:user,refetch:userRefetch}=useUser()
  const { data:template,refetch: temp_refetch, isLoading:temp_isLoading}= useTemplates();


  const addToCollection = async (e) => {
    e.stopPropagation();
    console.log( user?._id )
    console.log( user?.uid )

    try {
      console.log('<<<<<')
      console.log(user)
      const userId = user?.uid || user?.uid;
      if (!userId) return toast.error("User not authenticated");
      if (!data?._id) return toast.error("Invalid template data");

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

    const saveToFavourites = async (e) => {
    e.stopPropagation();
    try {
      const userId = user?._id || user?.uid;
      console.log('999999999999')
      console.log(data)
      if (!userId) return toast.error("User not authenticated");

      const { data: res } = await apis.post("/saveToFavourites", {
        userId,
        templateId: data._id,
      });

      toast.success(res.message);
      temp_refetch()
      refetch()
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["template", templateId],
    queryFn: () => getTemplateDetails(templateId),
    enabled: !!templateId, // ✅ prevents running if ID missing
  });

  if (isLoading) return <MainSpinner />; // ✅ Spinner on loading

  if (isError) return
  <div  className="w-full h-[60vh] flex flex-col items-center justify-center text-red-500">
  <p className="text-lg text-txtPrimary font-semibold">Error loading template...</p>
  </div>
  ;
  console.log('>>>>>>>>>>>??????????????')
  
  console.log('>>>>>>>>>>>??????????????.............')
console.log(data?.favourites)
  console.log(data)

  return (
    <div className="w-full flex items-center justify-start flex-col px-4 py-12">
      {/**bread crump */}
      <div className="w-full flex items-center pb-8 gap-2">
        <Link to={"/"} className="flex items-center justify-center gap-2 text-txtPrimary">
       <FaHouse/> Home
        </Link>
        <p>/</p>
        <p>{data?.title}</p>
      </div>
      {/**main section layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
  {/* Left section */}
  <div className="col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">
    {/* Load the template image */}
    <img
      className="w-full h-auto object-contain rounded-md"
      src={data?.imageUrl}
      alt={data?.title}
    />
  </div>
{/**design main section lay out*/}
<div className="w-full grid grid-cols-1 lg:grid-cols-12">

  {/* left section*/}
  <div className="col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">



  {/* Right section — title and other info */}
  <div className="w-full flex flex-col items-start justify-start gap-2">
    {/* Title section */}
    <div className="w-full flex items-center justify-between">
      {/* Title */}
      <p className="text-base text-txtPrimary font-semibold">
        {data?.title}
      </p>

      {/* Likes */}
      {data?.favourites?.length > 0 && (
        <div className="flex items-center justify-center gap-1">
          <BiSolidHeart className="text-base text-red-500" />
          <p className="text-base text-txtPrimary font-semibold">
            {data.favourites.length} Likes
          </p>
        </div>
      )}
      {/** collection favourite options */}
      {
        user && (
          <div className="flex items-center justify-center gap-3">
            {user?.collections?.includes(data?._id) ? 
            <React.Fragment>
              <div onClick={addToCollection} className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
              <BiSolidFolderPlus className="text-base text-txtPrimary"/>
              <p className="text-sm text-txtPrimary whitespace-nowrap">
                Remove From Collections
              </p>
              </div>
            </React.Fragment>:
            <React.Fragment>
                  <div  onClick={addToCollection} className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
              <BiFolderPlus className="text-base text-txtPrimary"/>

              <p className="text-sm text-txtPrimary whitespace-nowrap">
                Add to Collections
              </p>
              </div>
              </React.Fragment>}
              {/**Favourites */}
              { data?.favourites?.includes(user?._id) ? 
            <React.Fragment>
              <div onClick={saveToFavourites} className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
              <BiSolidHeart className="text-base text-txtPrimary"/>
              <p className="text-sm text-txtPrimary whitespace-nowrap">
                Remove From Collections
              </p>
              </div>
            </React.Fragment>:
            <React.Fragment>
                  <div  onClick={saveToFavourites} className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
              <BiHeart className="text-base text-txtPrimary"/>

              <p className="text-sm text-txtPrimary whitespace-nowrap">
                Add to Collections
              </p>
              </div>
              </React.Fragment>}
              {/**end */}
          </div>
        )
      }
    </div>
  </div>
</div>

</div>
{/**right section */}
<div className="col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6">
  {/**Start  of discover more */}
  <div className="w-full h-72 bg-blue-200 rounded-md overflow-hidden relative" style={{background: 'url(https://cdn.pixabay.com/photo/2023/10/04/03/04/ai-generated-8292699P_1280.jpg)',
    backgroundPosition:'center', backgroundSize:'cover'
  }}>
    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4">
      <Link to={'/'} className="px-4 py-2 rounded-md border-2 border-gray-50 text-white">discover more
      </Link>

    </div>
  </div>
  {/**end of discover more */}
  {/** edot the template   */}
  {user && (<Link to={`/resume/${data?.name}?templateId=${templateId}`}>
  <p className="text-white font-semibold text-lg"> 
    Edit this template
  </p>
  </Link>)}

</div>
</div>

    </div>
  );
};

export default TemplateDesignPinDetails;
