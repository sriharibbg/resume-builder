import axios from "axios";
import { auth } from "../config/firebase.config"
import apis from "../apis/apis";

export const getUserDetail=()=>{
    return new Promise((resolve,reject)=>{
        const unsubscribe=auth.onAuthStateChanged(async (userCred)=>{
            try{
                console.log('=====>>>>>>>')
            if(userCred){
                console.log('====@@=>>>>>>>')
            const userData=userCred.providerData[0];
           

            const fmData = new FormData();
            fmData.append("uid", userData.uid); // ✅ FIX: correct key
          fmData.append("displayName", userData.displayName || "");
          fmData.append("email", userData.email || "");
          fmData.append("photoURL", userData.photoURL || "");
          fmData.append("providerId", userData.providerId || "");
          fmData.append("phoneNumber", userData.phoneNumber || "");
            const { data } = await apis.post("/login", fmData, {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("><><><<%%%%%%%%%%%%%%")
        console.log(data.user)
        console.log(userData)
         //    resolve(userData)
         resolve(data.user)
        }else{
            reject(new Error("User is not authenticated"))
        }

    }catch(err){
    reject(err);
    }finally{
        unsubscribe();
    }
        })
    })
}
export const getTemplateDetails = async (templateId) => {
  const res = await apis.get(`/get-template/${templateId}`);
  console.log(">>>>>>>>>>>>>>>>>>>Id")
  
  console.log(res)
  return res.data.template; // ✅ returns template object only
};
