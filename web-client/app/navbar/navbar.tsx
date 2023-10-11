"use client";

import Image from "next/image";
import Link from "next/link";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubsribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    return () => unsubsribe();
  }, []);
  return (
    <div className="flex justify-between items-center p-1">
      <Link href="/" className="cursor-pointer">
        <Image src="/youtube.png" alt="Youtube Logo" width={90} height={20} />
      </Link>
      <SignIn user={user} />
    </div>
  );
}
