"use client";

import { removePrompt } from "@/app/redux/slice";
import { AppDispatch, RootState } from "@/app/redux/store";
import Navbar from "@/components/navbar";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SavedConversationpage() {
  const { prompts, status } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<AppDispatch>();

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const savedPrompts = prompts.filter(
    (item: { isSaved: boolean }) => item.isSaved
  );

  const handleRemove = (promptId: string) => {
    dispatch(removePrompt(promptId));
  };

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-6 px-4 md:px-8">
        {status === "loading" && (
          <div className="flex justify-center items-center h-20">
            <LoaderCircle className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        )}

        {savedPrompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {savedPrompts.map(
              (item: { id: string; prompt: string; response: string }) => (
                <div
                  key={item.id}
                  className="p-5 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Prompt:
                  </h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {item.prompt}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Response:
                  </h3>
                  <p className="text-sm text-gray-700">
                    {expanded[item.id]
                      ? item.response
                      : item.response.slice(0, 520)}
                    {item.response.length > 520 && (
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="text-blue-500 ml-2 hover:underline"
                      >
                        {expanded[item.id] ? "...See Less" : "...See More"}
                      </button>
                    )}
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-lg">
              No saved conversations found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedConversationpage;
