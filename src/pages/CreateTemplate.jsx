import React, { useState } from 'react'
import { FaTrash, FaUpload } from 'react-icons/fa6'
import { PuffLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { initialTags } from '../utils/helper'
import useTemplates from '../hooks/useTemplates'

function CreateTemplate() {
    const [formData,setFormData]=useState({
        title:"",
        imageURL:null
    })
    const { data: templates, isError: templatesIsError, isLoading: templatesIsLoading, refetch: templatesRefetch } = useTemplates()

    const [imageAsset,setImageAsset]=useState({
        isImageLoading:false,
        uri:null,
        image:null,
        progress:0}
    )
    // handling the input field change
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setFormData((prevRec)=>({...prevRec,[name]:value}))
    }
    const [selectedTags,setSelectedTags]=useState([])
    const deleteAnObject=async(e)=>{
  setImageAsset((prevAsset)=>({
                ...prevAsset,
                image:null,
                uri:null,
                isImageLoading:false
            }))

    }
    //handling the image file changes
    const handleFileSelect=async(e)=>{
        
        setImageAsset((prevAsset)=>({...prevAsset,isImageLoading:true}))
        
    if (e.target.files.length > 0) {
        const file =e.target.files[0]
        console.log(file)
        if(file && isAllowed(file)){
            setImageAsset((prevAsset)=>({
                ...prevAsset,
                image:file,
                uri:URL.createObjectURL(file),
                isImageLoading:false
            }))

        }else{
            toast.info('file format not supported')
        }

    }
}
const handleSelectTags=(tag)=>{
    //check if the tag is selected or not
    if(selectedTags.includes(tag)){
        setSelectedTags(selectedTags.filter((selected)=>selected!==tag))
    }else{
        setSelectedTags([...selectedTags,tag])
    }
}
    const isAllowed=(file)=>{
        const allowedTypes=['image/jpeg','image/jpg','image/png']
        return allowedTypes.includes(file.type)
    }
    const pushToCloud=async ()=>{

    }
  return (
    <div className='w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12'>
        {/**left container */}
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-center flex-col gap-4 px-2'>
            <div className='w-full'>
                <p className='text-lg text-txtPrimary'> Create a new Template</p>
            </div>
            {/**template ID section */}
            <div className='w-full flex items-center justify-end'>
                <p className='text-base text-txtLight uppercase font-semibold'>TempID:{""}</p>
                
                <p className='text-sm text-txtDark capitalize font-bold'>Templete1</p>
            </div>
            {/** template title section*/}
            <input className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none' type='text' target='title' placeholder='Template Title' value={formData.title} onChange={handleInputChange}/>
         {/**file upload section */}
        <div className='w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[460px] 2xl:h-[720px] 
        rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center' >
            {
                imageAsset.isImageLoading?<React.Fragment>     
                    <div className='flex flex-col items-center justify-center gap-4 '>
                        <PuffLoader color='#498FCD' size={40}/>
                        <p>{imageAsset?.progress.toFixed(2)}%</p>
                        </div> 1</React.Fragment>:
                        <React.Fragment>
                            {!imageAsset?.uri?<React.Fragment>
                                <label className='w-full cursor-pointer h-full'>
                                    <div className='flex flex-col items-center justify-center h-full w-full'>
                                     <div className='flex items-center justify-center cursor-pointer flex-col gap-4'>
                                        <FaUpload className='text-2xl'></FaUpload>
                                        <p className='text-lg text-txtLight'>Click to upload</p></div>
                                    </div>
                                    <input type='file' className='w-0 h-0' accept='.jpeg,.jpg,.png' onChange={handleFileSelect} />
                                </label>
                            </React.Fragment>:<React.Fragment>
                                <div className='relative w-full h-full overflow-hidden rounded-md'>
                                    <img src={imageAsset?.uri} className='w-full h-full object-cover '  loading='lazy' alt=''/>
                                {/**delete action button */}
                                <div className='absolute top-4 right-4 w-8 h-8 rounded-md  flex items-center justify-center bg-red-500  cursor-pointer ' onClick={deleteAnObject}>
                                    <FaTrash className='text-sm text-white' />
                                </div>
                                </div>
                                </React.Fragment>}
                        </React.Fragment>
            }
        </div>
        <div className='w-full flex items-center flex-wrap gap-2'>
            {
                initialTags.map((tag,i) => {
                   return  <div key={i} className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${selectedTags.includes(tag)?"bg-blue-500 text-white":""}`} onClick={()=>handleSelectTags(tag)}>
                        <p className='text-xs'>{tag}</p>
                    </div>
                })
            }

        </div>
        {/**button action */}
        <button type='button' className='w-full bg-blue-700 text-white rounded-md py-3' onClick={pushToCloud}></button>
       
        </div>
        {/**right container */}
        <div className='col-span-12 lg:col-span-8 2xl:col-span-9 '></div>
      
    </div>
  )
}

export default CreateTemplate
