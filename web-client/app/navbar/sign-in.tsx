"use client";

import { signInWithGoogle, signOut } from "@/firebase/firebase";
import { User } from "firebase/auth";

export default function SignIn({ user }: { user: User | null }) {
  return (
    <div>
      {user ? (
        <button
          className="border-1 border-solid bg-slate-200 border-gray-500 px-5 py-3 rounded-full font-mono text-sm cursor-pointer hover:border-transparent hover:bg-slate-300"
          onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button
          className="border-1 border-solid bg-slate-200 border-gray-500 px-5 py-3 rounded-full font-mono text-sm cursor-pointer hover:border-transparent hover:bg-slate-300"
          onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </div>
  );
}
