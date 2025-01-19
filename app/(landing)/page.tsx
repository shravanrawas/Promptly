import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
          Welcome to Promptly
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Simplify your chat experience with Promptly — an intuitive, platform
          to enhance your conversations.
        </p>
      </div>

      <div className="flex space-x-4">
        <Link href="/sign-in">
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700">
            Sign In
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-green-600">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
