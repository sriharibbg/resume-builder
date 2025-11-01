import React, { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { FadeInOutWithOpacity, scaleInOut } from '../animations'
import { FiFolderPlus, FiHeart } from "react-icons/fi"
import { BiSolidFolderPlus } from "react-icons/bi";
import useUser from '../hooks/useUser'
import useTemplates from '../hooks/useTemplates';
import { toast } from 'react-toastify';
import apis from '../apis/apis';
function TemplateDesignPin({data,index}) {
    const {data:user,refetch:userRefetch}=useUser()
    
const { refetch: temp_refetch } = useTemplates();
const addToCollection = async (e) => {
  e.stopPropagation();
  console.log('ksjfdksdjf')

  try {
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }

    if (!data?._id) {
      toast.error("Invalid template data");
      return;
    }

    const { data: res } = await apis.post("/saveToCollections", {
      uid: user.uid,
      dataId: data._id,
    });

    toast.success(res.message);
    userRefetch(); // ✅ refresh user data (collections array)
  } catch (err) {
    console.error("Error adding to collection:", err);
    toast.error(`Error: ${err.response?.data?.message || err.message}`);
  }
};






const saveToFavourites = async (e) => {
    console.log('clicked')
  try {
    if (!user?._id && !user?.uid) {
      toast.error("User not authenticated");
      return;
    }

    const userId = user._id || user.uid; // depending on backend auth
    const templateId = data._id;

    const { data: res } = await apis.post("/saveToFavourites", {
      userId,
      templateId,
    });

    toast.success(res.message);
  } catch (err) {
    console.error(err);
    toast.error(`Error: ${err.response?.data?.error || err.message}`);
  }
};



  return (
    <motion.div  key={data?._id || index}
     {...scaleInOut(index)}
      className="p-3">
    <div className=' w-full
         
          rounded-xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition-shadow
          duration-300
          ease-in-out
          flex
          items-center
          justify-center 
          bg-white-200  relative h-[350px] 2xl:h-[440px]  gap-4'>
        
     <img src={data?.imageUrl} className=' m-10 w-full
            h-full
            object-contain
            rounded-lg
            transition-transform
            duration-300
            hover:scale-[1.02] gap-4 marg' alt=''/>
            <AnimatePresence>
                <motion.div {...FadeInOutWithOpacity} className='absolute inset-0 bg-[rgba(0,0,0,0.4)] 
                flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer'>
                    <div className='flex flex-col items-end justify-start w-full gap-8'>
                    <InnerBoxCard
                     label={user?.collections?.includes(data?._id)
                     ?'Added to collections':'Add to collections'} Icon={user?.collections?.includes(data?._id)? BiSolidFolderPlus : FiFolderPlus} onHandle={addToCollection}/>
                     <InnerBoxCard label={'Add to Collection'} Icon={FiHeart} onHandle={saveToFavourites}/>
                    
                    </div>
                </motion.div>
            </AnimatePresence>
    </div>
    </motion.div>
  )
}
const InnerBoxCard=({label,Icon,onHandle})=>{
    const [isHoverred,setIsHoverred]=useState(false)
    return <div onChange={onHandle} className='w-10 h-10
    rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative'
    onMouseEnter={()=>setIsHoverred(true)}
    onMouseLeave={()=>setIsHoverred(false)}>
        <Icon className='text-txtPrimary text-base'></Icon>
        <AnimatePresence>
            { isHoverred && <motion.div 
             initial={{ opacity: 0, scale: 0.6, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.6, x: 50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
            className='px-3 py-2 rounded-md bg-gray-200 absolute
            -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute 
            after:-right-1 after:top-[14px] after:rotate-45'>
                <p className='text-sm text-txtPrimary whitespace-nowrap'>
                {label}
                </p>

            </motion.div>

            }
        </AnimatePresence>
    </div>

}
export default TemplateDesignPin
