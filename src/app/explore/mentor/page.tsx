"use client";

import {
useState,
useRef,
useEffect,
} from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import MentorLanding from "@/components/mentor/MentorLanding";
import MentorChat from "@/components/mentor/MentorChat";
import MentorInput from "@/components/mentor/MentorInput";

export default function MentorPage() {

const [message, setMessage] =
useState("");

const [loading, setLoading] =
useState(false);

const [messages, setMessages] =
useState<any[]>([]);

const bottomRef =
useRef<HTMLDivElement>(null);

useEffect(() => {

bottomRef.current?.scrollIntoView({
  behavior: "smooth",
});

}, [messages, loading]);

async function askMentor() {

if (!message.trim()) return;

const userMessage = {
  role: "user",
  content: message,
};

setMessages((prev) => [
  ...prev,
  userMessage,
]);

setLoading(true);

try {

  const res = await fetch(
    "/api/mentor",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        messages: [
          ...messages,
          {
            role: "user",
            content: message,
          },
        ],
      }),
    }
  );

  const data =
    await res.json();

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: data.reply,
    },
  ]);

  setMessage("");

} catch (error) {

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content:
        "Sorry, something went wrong.",
    },
  ]);

}

setLoading(false);

}

function handlePromptClick(
prompt: string
) {

setMessage(prompt);

}

return (

<main
  className="
  min-h-screen

  bg-[#020617]

  text-white

  relative

  px-4
  md:px-8

  py-8
  "
>
  <DashboardNavbar />

  

  {/* Background Glow */}

 {/* ULTRA SPECTRAL BACKGROUND */}

<div className="absolute inset-0 -z-10 overflow-hidden">

  

  {/* Pink */}
  <div
    className="
    absolute
    top-[-100px]
    left-[-150px]

    w-[500px]
    h-[500px]

    rounded-full

    bg-fuchsia-500/50

    blur-[120px]
    "
  />

  {/* Cyan */}
  <div
    className="
    absolute
    bottom-[-100px]
    right-[-150px]

    w-[500px]
    h-[500px]

    rounded-full

    bg-cyan-500/40

    blur-[120px]
    "
  />

  {/* Purple Center */}
  <div
    className="
    absolute

    top-[30%]
    left-1/2

    -translate-x-1/2

    w-[300px]
    h-[300px]

    rounded-full

    bg-violet-500/40

    blur-[100px]
    "
  />

  {/* Orange Accent */}
  <div
    className="
    absolute

    top-[15%]
    right-[10%]

    w-[220px]
    h-[220px]

    rounded-full

    bg-orange-400/30

    blur-[80px]
    "
  />

</div>
  <div
    className="
    max-w-6xl

    mx-auto
    "
  >

    {messages.length === 0 ? (

      <MentorLanding
        onPromptClick={
          handlePromptClick
        }
      />

    ) : (

      <>

        <MentorChat
          messages={messages}
          loading={loading}
        />

        <div ref={bottomRef} />

      </>

    )}

    <div className="mt-8">

      <MentorInput
        message={message}
        setMessage={setMessage}
        askMentor={askMentor}
        loading={loading}
      />

    </div>

  </div>

</main>

);

}