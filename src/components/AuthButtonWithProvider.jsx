import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import{GoogleAuthProvider,GithubAuthProvider, signInWithRedirect} from 'firebase/auth'
import { auth } from '../config/firebase.config';

const  AuthButtonWithProvider=({Icon,label,provider})=> {
  const googleAuthProvider=new GoogleAuthProvider();
  const githubAuthProvider=new GithubAuthProvider()
  const handleClick=async ()=>{
    switch(provider){
        case "GoogleAuthProvider":
            console.log("Inside the Google Auth")
            console.log('haha')
            await signInWithRedirect(auth,googleAuthProvider).then((result)=>{
              console.log(result)
            }).catch(err=>{
              console.log(`Error:${err}`)
            })
            break;
            case "GitHubAuthProvider":
                console.log('Inside the Github Auth')
                 await signInWithRedirect(auth,githubAuthProvider).then((result)=>{
              console.log(result)
            }).catch(err=>{
              console.log(`Error:${err}`)
            })
                break;
                default:
                    console.log('Inside haha the Google Auth')
                    break;
    }
  }
    return (
    <div onClick={handleClick} className='w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group hover:bg-blue-700 active:scale-95 duration-150 hover:shadow-md'>

   {  <Icon className='text-txtPrimary text-xl group-hover:text-white' />}
      <p className='text-txtPrimary text-lg group-hover:text-white'>{label}</p>
    <FaChevronRight className='text-txtPrimary text-base group-hover:text-white'/>
    </div>
  )
}

export default AuthButtonWithProvider
