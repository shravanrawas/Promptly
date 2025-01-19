"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, CopyIcon, Pause, SendIcon, Volume2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Typewriter from "typewriter-effect";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import { saveSearchPrompt } from "@/app/redux/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";


type ConversationMessage = {
  type: "user" | "ai";
  message: string;
};

function Conversationpage() {
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState("");
  const [isCopied, setIscopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [isSpeaking, setisSpeaking] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GoogleAI API key is not defined");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ConversationMessage = { type: "user", message: input };
    setConversation((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(input);
      const aiResponse = await result.response.text();

      const aiMessage: ConversationMessage = {
        type: "ai",
        message: aiResponse.replace(/\*+/g, ""),
      };
      setConversation((prev) => [...prev, aiMessage]);

      const payload = {
        userId: user?.id || null,
        prompt: userMessage.message,
        response: aiMessage.message
      };

      dispatch(saveSearchPrompt(payload));
      console.log(userMessage.message, aiMessage.message);
    } catch (error) {
      console.error("Error fetching chat response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message).then(() => {
      setIscopied(true);
      setTimeout(() => {
        setIscopied(false);
      }, 2000);
    });
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInput(suggestion);
      handleSendMessage();
  };

  const handlePlayAudio = (message: string) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    setisSpeaking(true);
  };

  const handleStopAudio = () => {
    window.speechSynthesis.cancel();
    setisSpeaking(false);
  };

  useEffect(() => {
    if (conversation.length >= 2 && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto mb-[60px] p-4 space-y-4">
        {conversation.length === 0 ? (
          <div className="p-6 bg-gray-100 rounded-xl text-center text-gray-600 shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Hello, {user?.firstName}. Try asking something like:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "What is the capital of India?",
                "Tell me a fun fact!",
                "Can you help with coding?",
                "Tell me some myths!",
                "What is the tallest mountain in the world?",
                "How do airplanes fly?",
                "Explain the theory of relativity!",
                "What are black holes?",
                "What is the population of Earth?",
                "Can you recommend a good book?",
                "Who invented the telephone?",
                "What are some famous historical events?",
                "What is quantum mechanics?",
                "How does the internet work?",
                "What are the seven wonders of the world?",
                "What is the fastest animal on Earth?",
                "What is the meaning of life?",
                "Tell me a joke!",
                "What is the deepest ocean?",
                "How does electricity work?",
                "What are the benefits of meditation?",
                "What is artificial intelligence?",
                "Can you explain machine learning?",
                "What are some interesting space facts?",
                "What is the largest desert in the world?",
                "What is the most spoken language in the world?",
                "Who painted the Mona Lisa?",
                "What is the smallest country in the world?",
                "What are the stages of the water cycle?",
                "How do plants make food?",
              ]
                .sort(() => 0.5 - Math.random())
                .slice(0, 6)
                .map((suggestion, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    {suggestion}
                  </Button>
                ))}
            </div>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "items-start"
              }`}
            >
              {message.type === "ai" && (
                <img
                  src="/logo.svg"
                  alt="AI Avatar"
                  className="h-8 w-8 rounded-full mr-3"
                />
              )}

              <div
                className={`p-3 rounded-lg max-w-xs md:max-w-xl shadow relative ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.type === "ai" ? (
                  <>
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(message.message)
                          .callFunction(() => {
                            typewriter.stop();
                          })
                          .start();
                      }}
                      options={{
                        delay: 10,
                        cursor: "",
                      }}
                    />
                    {message.message.length > 150 && (
                      <div className="flex mt-4 gap-2">
                        <Button
                          onClick={() => handleCopy(message.message)}
                          className="p-2 bottom-2 right-6 text-gray-200"
                        >
                          {isCopied ? <Check /> : <CopyIcon />}
                        </Button>
                        {isSpeaking ? (
                          <Button
                            onClick={() => handleStopAudio()}
                            className="p-2 bottom-2 right-2 text-gray-200"
                          >
                            <Pause />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handlePlayAudio(message.message)}
                            className="p-2 bottom-2 right-2 text-gray-200"
                          >
                            <Volume2 />
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  message.message
                )}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center mt-6 justify-start">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="AI Avatar"
                className="h-8 w-8 rounded-full animate-spin-slow"
              />
              <span className="text-gray-500 text-sm font-medium animate-pulse">
                Thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-gray-50 shadow-md border-t flex items-center gap-4">
        <input
          type="text"
          placeholder="Ask Promptly..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-6 py-5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-sm"
        />
        <Button
          onClick={handleSendMessage}
          className={`flex items-center justify-center px-6 py-3 rounded-full text-white font-medium transition ${
            isLoading || input.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading || input.length === 0}
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Conversationpage;
