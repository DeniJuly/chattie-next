import Image from 'next/image';
import React from 'react';

import IcSend from '../public/img/send.webp';
import Avatar from './components/avatar/avatar';
import CardChat from './components/card/card-chat';

function Home() {
  return (
    <main className="h-screen w-screen bg-black-sidebar grid grid-cols-12">
      <div className="col-span-3 h-screen flex flex-col">
        {/* Header */}
        <div className="px-5 flex items-center gap-4 py-4 border-b border-black-border">
          <div className="bg-cream-bubble-chat h-10 w-10 rounded-full flex items-center justify-center text-2xl text-black font-medium">
            D
          </div>
          <p className="text-2xl text-white">Chat dong</p>
        </div>
        <div className="overflow-y-auto flex-1 no-scrollbar">
          {/* Story */}
          <div className="mt-6">
            <h6 className="text-white text-3xl pl-5 mb-3">Story</h6>
            <div className="overflow-x-auto w-full no-scrollbar">
              <div className="inline-flex gap-2">
                <div className="ml-3" />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </div>
            </div>
          </div>
          {/* List chat */}
          <div className="mt-6">
            <h6 className="text-white text-3xl pl-5 mb-3">Message</h6>
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
          </div>
        </div>
      </div>
      <div className="col-span-9 h-screen bg-black-bg-chat flex flex-col">
        {/* Header */}
        <div className="px-5 flex items-center gap-4 py-4 border-b border-black-border bg-black-sidebar">
          <div className="bg-cream-bubble-chat h-10 w-10 rounded-full flex items-center justify-center text-2xl text-black font-medium">
            D
          </div>
          <p className="text-2xl text-white">Chat dong</p>
        </div>
        {/* Chat body */}
        <div className="flex flex-1 flex-col px-5 overflow-y-auto">
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
          <p className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </p>
        </div>
        <div className="w-full flex items-center py-2 px-5 gap-5 bg-black-sidebar">
          <input
            type="text"
            className="border border-black-border px-4 py-3 flex-1 rounded-full bg-black-sidebar text-white focus:outline-0 focus:bg-black-border focus:ring-0"
            placeholder="Ketik pesan"
          />
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-cream-bubble-chat">
            <Image src={IcSend} width={30} height={30} alt="send" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
