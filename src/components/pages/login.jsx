import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

export default function Login() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
                  <Logo style={{height:"8rem",width:"16rem", fill:"#fff"}}></Logo>
                  <h1 className="font-bold text-3xl pb-8 text-white">melophile</h1>
      <div>
        
        <a
          href="https://us-central1-melophile-d7325.cloudfunctions.net/login"
          className="text-white py-2 px-12 rounded-full bg-gray-800 focus:outline-none focus:shadow-outline"
        >
          <span>Login with Spotify</span>
        </a>
      </div>
    </div>
  );
}
