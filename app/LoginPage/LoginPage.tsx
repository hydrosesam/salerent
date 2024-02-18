"use client";

import React, { useEffect } from "react";
import useLoginModal from "../hooks/useLoginModal";
import Image from "next/image";

const LoginPage = () => {
  const loginModal = useLoginModal();

  useEffect(() => {
    loginModal.onOpen(); // Open the login modal when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // LoginPage should render something
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        // onClick={() => router.push("/")}
        alt="background"
        className="hidden md:block cursor-pointer w-full h-full"
        height="100"
        width="200"
        src="/images/LoginModal.jpg"
      />
    </div>
  );
};

export default LoginPage;
