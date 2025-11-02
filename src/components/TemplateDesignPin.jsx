import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeInOutWithOpacity, scaleInOut } from '../animations';
import { FiFolderPlus, FiHeart } from "react-icons/fi";
import { BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi";
import useUser from '../hooks/useUser';
import useTemplates from '../hooks/useTemplates';
import { toast } from 'react-toastify';
import apis from '../apis/apis';
import { useNavigate } from 'react-router-dom';

function TemplateDesignPin({ data, index }) {
  const { data: user, refetch: userRefetch } = useUser();
  const { refetch: temp_refetch } = useTemplates();

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
      if (!userId) return toast.error("User not authenticated");

      const { data: res } = await apis.post("/saveToFavourites", {
        userId,
        templateId: data._id,
      });

      toast.success(res.message);
      temp_refetch()
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const isInCollection = user?.collections?.includes(data?._id);
   const isFavourites = data?.favourites?.includes(user?._id);
   const[isHoverred,setIsHoverred] =useState(false)
   const navigate=useNavigate()
  
   const handleRouteNavigation=()=>{
    navigate(`/resumeDetail/${data?._id}`,{replace:true})
   }



  return (
    <motion.div key={data?._id || index} {...scaleInOut(index)} className="p-3">
      <div
        className="relative w-full rounded-xl overflow-hidden 
             bg-white h-[350px] 2xl:h-[440px]
             flex items-center justify-center
             border border-gray-200
             shadow-[0_4px_20px_rgba(0,0,0,0.1)]
             hover:shadow-[0_6px_25px_rgba(0,0,0,0.15)]
             transition-all duration-300 ease-in-out"
                onMouseEnter={()=>setIsHoverred(true)}
                onMouseLeave={()=>setIsHoverred(false)}
      >
        <img
          src={data?.imageUrl}
          alt=""
          className="m-10 w-full h-full object-contain rounded-lg
               transition-transform duration-300 hover:scale-[1.02]"
        />

        <AnimatePresence>
       {isHoverred &&(   <motion.div
            {...FadeInOutWithOpacity}
            onClick={handleRouteNavigation}
            className="absolute inset-0 bg-[rgba(0,0,0,0.4)]
                       flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"
          >
            <div className="flex flex-col items-end justify-start w-full gap-8">
              <InnerBoxCard
                label={isInCollection ? 'Added to Collections' : 'Add to Collections'}
                Icon={isInCollection ? BiSolidFolderPlus : FiFolderPlus}
                onHandle={addToCollection}
              />
              <InnerBoxCard
                label={isFavourites?'Added to Favourites':'Add to Favorites'}
                Icon={isFavourites?BiSolidHeart:BiHeart}
                onHandle={saveToFavourites}
              />
            </div>
          </motion.div>)

       }
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const InnerBoxCard = ({ label, Icon, onHandle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onHandle} // ✅ fixed from onChange
      className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center
                 hover:shadow-md relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="text-txtPrimary text-base" />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="px-3 py-2 rounded-md bg-gray-200 absolute
                       -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute 
                       after:-right-1 after:top-[14px] after:rotate-45"
          >
            <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateDesignPin;
