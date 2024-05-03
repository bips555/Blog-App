import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import app from "../firebase.js";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
 
  const [imageFileUploaderror, setImageFileUploaderror] = useState(null);
  const filePickerRef = useRef();
  console.log(imageFileUploadProgress,imageFileUploaderror)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageFileUploaderror(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      
      },
      (error) => {
        setImageFileUploaderror(
          "Could not upload image (File must be less than 200 MB and an image)"
        );
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
             <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}  strokeWidth={5}
             styles={{
              root:{
                width:'100%',
                position:'absolute',
                height:'100%',
                top:0,
                left:0
              },
              path:{
                stroke:`rgba(60,179,113,${imageFileUploadProgress/100})`
              },

             }}/>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-gray-300 ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'filter blur-sm' }`}
          />
         
        </div>
        {imageFileUploaderror &&  <Alert color='failure'>{imageFileUploaderror}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          defaultValue="*******"
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"}>
          Update
        </Button>
      </form>
  
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
