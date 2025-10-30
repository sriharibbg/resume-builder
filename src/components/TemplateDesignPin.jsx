import React, { useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import { FadeInOutWithOpacity, scaleInOut } from '../animations'
import { FiFolderPlus, FiHeart } from "react-icons/fi"
function TemplateDesignPin({data,index}) {
    const addToCollection=async()=>{

    }
    const addToFavourites=async()=>{

    }
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
                        <InnerBoxCard label={'Add to Collection'} Icon={FiFolderPlus} onHandle={addToCollection}/>
                      <InnerBoxCard label={'Add to Collection'} Icon={FiHeart} onHandle={addToCollection}/>
                    
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
