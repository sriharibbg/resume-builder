import React, { useEffect, useState } from 'react'
import {  FaUpload } from 'react-icons/fa6'
import { FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { initialTags } from '../utils/helper'
import useTemplates from '../hooks/useTemplates'
import { serverTimestamp } from 'firebase/firestore'
import apis from '../apis/apis'
import { add_template, messageClear, remove_template } from '../store/reducers/templateReducer';

function CreateTemplate() {
  const dispatch = useDispatch();
    const [formData,setFormData]=useState({
        title:"",
        imageURL:null
    })
    const { data: templates, isError: templatesIsError, isLoading: templatesIsLoading, refetch: templatesRefetch } = useTemplates()
console.log('......>>>>>')
console.log(templates)
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
        
    const timestamp=serverTimestamp()
    const fmData = new FormData();
     fmData.append("title", formData.title);
    fmData.append("image", imageAsset.image);
    fmData.append("tags", selectedTags);

    fmData.append("name", templates && templates.length>0?`Templates${templates.length+1}`:'Template1');
    fmData.append("timestamp", timestamp);
     // async (product, { rejectWithValue, fulfillWithValue }) => {
   
   //   const { data } = await apis.post("/add-tmplate", fmData);
   
    dispatch(add_template(fmData));
      
    }
      const { loader, successMessage, errorMessage, categorys } = useSelector(
    (state) => state.template
  );
  const removeTemplate= async (template)=>{
    console.log(">>>>>>>>>>>>")
    dispatch(remove_template(template))
    console.log(template)

  }
    useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    setImageAsset((prevAsset)=>({...prevAsset,uri:null}))
    setSelectedTags([])
    templatesRefetch()
    toast.success("Data pushed to the cloud")
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

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
                
                <p className='text-sm text-txtDark capitalize font-bold'>{
                    templates &&templates.length>0?`Templates${templates.length+1}`:"Template1"}</p>
            </div>
            {/** template title section*/}
            <input className='w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none' type='text' name='title' target='title' placeholder='Template Title' value={formData.title} onChange={handleInputChange}/>
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
                                     <div className='flex items-center justify-center cursor-pointer flex-col gap-10'>
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
                                    <FaTrash className="text-sm" style={{ color: 'white' }} />

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
        <button type='button' className='w-full bg-blue-700 text-white rounded-md py-3' onClick={pushToCloud}>Save</button>
       {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>")
       }
       {
        
        // console.log(templates[0])
       }
        </div>
        {/**right container */}
        <div className='col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4'>
            {
                templatesIsLoading?<React.Fragment>
                    <div className='w-full h-full flex items-center justify-center'>
                        <PuffLoader color='#498FCD' size={40}/>
                    </div>
                </React.Fragment>:<React.Fragment>
                    {templates && templates.length>0?
                    <React.Fragment>
                        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-10'>
                        {
                           
                            templates?.map(template =>(
                                <div key={template._id} className='w-full h-[500px] rounded-md overflow-hidden relative'>
                                    <img src={template?.imageUrl} alt='' className='w-full h-full object-cover'/>
                                   
                                   {/**delete action */}
                                   <div className='absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer' onClick={()=>removeTemplate(template)}>
<FaTrash className="text-sm" style={{ color: 'white' }} />
                                   </div>

                                </div>
                            )

                            )
                        }
                        </div>
                    </React.Fragment>:
                    <React.Fragment>
                        <div className='w-full h-full flex flex-col gap-6 items-center justify-center'>
                        <PuffLoader color='#498FCD' size={40}/>
                        <p className='text-x1 tracking-wider capitalize text-txtPrimary'>
                        No data
                        </p>
                        </div>
                    </React.Fragment>}

                </React.Fragment>
            }
        </div>
      
    </div>
  )
}

export default CreateTemplate
