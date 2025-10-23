import React from 'react'
import { PuffLoader } from "react-spinners";
function MainSpinner() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <PuffLoader size={80} color='#498FCD'></PuffLoader>
    </div>
  )
}

export default MainSpinner
