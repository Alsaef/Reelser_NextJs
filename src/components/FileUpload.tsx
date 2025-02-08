"use client";
import React, { useRef, useState } from "react";
import {  IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface fileUploadProps {
    onSuccess:(res:IKUploadResponse)=>void;
    onProgress:(progress:number)=>void;
    fileType?:"image"|"video"
}




export default function UploadImage({
    onSuccess,
    onProgress,
    fileType='image'

}:fileUploadProps) {

    const [uploading,setUploding]=useState(false)
    const [error,SetError]=useState<string|null>(null)


  const onError = (err:{message:string}) => {
    console.log("Error", err);
    SetError(err.message)
    setUploding(false)
  };
  
  const HandelSuccess = (response:IKUploadResponse) => {
    console.log("Success", response);
    setUploding(false)
    SetError(null)
    onSuccess(response)
  };
  
  const handelProgress = (evt:ProgressEvent) => {
 
    if (evt.lengthComputable && onProgress) {
        const preComputabl=(evt.loaded / evt.total)*100
        onProgress(Math.round(preComputabl))
    }



  };
  
  const handelStartUpload = () => {
    setUploding(true)
    SetError(null)
  };


  const ValidedFile=(file:File)=>{
     if (fileType=='video') {
        


        if (!file.type.startsWith('video/')) {
           SetError('please Upload video') 
           return false
        }


        if (file.size > 100 * 1024 * 1024) { // 100 MB
            SetError('File size should be less than 100 MB');
            return false;
         }

     }else{
        const validTypes=['image/jpeg','image/png','image/webp']

        if(!validTypes.includes(file.type)){
             SetError('upload a valid file')
             return false
        }
        if (file.size > 10 * 1024 * 1024) { // 10 MB
            SetError('File size should be less than 100 MB');
            return false;
         }
     }
    return false
  }



  return (
    <div className="space-y-3">
      <h1>ImageKit Next.js quick start</h1>
        <p>Upload an image with advanced options</p>
        <IKUpload
          fileName={fileType ==='video'? 'video' : "image"}
          useUniqueFileName={true}

          validateFile={ValidedFile}
          webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
     
          onError={onError}
          onSuccess={HandelSuccess}
          onUploadProgress={handelProgress}
          onUploadStart={handelStartUpload}
          folder={fileType==='video'?'/videos':'/images'}
        />
       {
        uploading&&(
            <div className="flex items-center gap-3 text-primary">
                 <Loader2 className="animate-spin w-4 h-4"/>
                 <span>Uploading.....</span>
            </div>
        )
       }

       {
        error&&(
            <div className="text-red-500 text-center">{error}</div>
        )
       }
        
    </div>
  );
}