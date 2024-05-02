import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase.js";
import {useDispatch} from "react-redux"
import { signInSuccess,signInFailure } from "../app/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
    const dispatch = useDispatch()
    const navigate =useNavigate()
  const handleClick = async () => {
  
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.getCustomParameters({ prompt: 'select_account' });

    try
    {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle)

        const res = await fetch ('/api/auth/google',
    {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name:resultFromGoogle.user.displayName,
            email:resultFromGoogle.user.email,
            googlePhotoUrl:resultFromGoogle.user.photoURL
        })
    })
    console.log(res)
    const data = await res.json()
    if(res.ok)
    {
        dispatch(signInSuccess(data))
        navigate('/')
    }
    }
    catch(error)
    {
        dispatch(signInFailure(error.message))
    }
  };
  return (
    <Button
      onClick={handleClick}
      gradientDuoTone="pinkToOrange"
      type="button"
      outline
    >
      <div className="flex justify-center items-center">
        <div>
          {" "}
          <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        </div>

        <div>Continue with Google</div>
      </div>
    </Button>
  );
};

export default Oauth;
