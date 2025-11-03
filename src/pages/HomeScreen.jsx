import React, { Suspense } from 'react'
import { Header,MainSpinner } from '../components'
import { Route, Routes } from 'react-router-dom'
import { HomeContainer } from '../containers'
import CreateTemplate from './CreateTemplate'
import UserProfile from './UserProfile'
import CreateResume from './CreateResume'
import TemplateDesignPinDetails from './TemplateDesignPinDetails'

function HomeScreen() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Header />
      <main className='w-full'>{/*custom routes*/}
      <Suspense fallback={<MainSpinner />}>
      <Routes>
        <Route path='/'element={<HomeContainer/>} />
        <Route path='/template/create'element={<CreateTemplate/>} />
        <Route path='/profile/uid' element={<UserProfile/>} />
        <Route path='/resume/*'element={<CreateResume/>} />
        
        
       {/**  <Route path='/resumeDetail/:templateId'element={<TemplateDesignPinDetails/>} />*/}
        <Route path='/resumeDetail/:templateId' element={<TemplateDesignPinDetails />} />
      </Routes>

      </Suspense>
      </main>
      home
    </div>
  )
}

export default HomeScreen
