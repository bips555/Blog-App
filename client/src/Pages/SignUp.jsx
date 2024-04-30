import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 rounded-lg text-indigo-100 bg-gradient-to-r from-red-500 via-blue-500 to-orange-500">
              Biplov's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign up with your email and password or with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>

            <div>
              {" "}
              <Label value="Your Password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit">
              Sign Up</Button>

          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to='/sign-in' className="text-blue-500">
             Sign in
              </Link>
              </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
