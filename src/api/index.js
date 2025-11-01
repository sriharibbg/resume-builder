import axios from "axios";
import { auth } from "../config/firebase.config"
import apis from "../apis/apis";

export const getUserDetail=()=>{
    return new Promise((resolve,reject)=>{
        const unsubscribe=auth.onAuthStateChanged(async (userCred)=>{
            try{
            if(userCred){
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

