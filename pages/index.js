import { addDoc, collection, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { database } from '../firebaseConfig';
import IcSend from '../public/img/send.webp';
import Avatar from './components/avatar/avatar';
import CardChat from './components/card/card-chat';

function Home() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const dbInstance = collection(database, "chats");
  const [showPopupUser, setShowPopupUser] = useState(false);

  const saveChat = () => {
    let date = new Date();
    addDoc(dbInstance, {
      chat: message,
      time: date,
      user: user,
    }).then(() => {
      setMessage("");
    });
  };
  const chatRef = collection(database, "chats");
  const q = query(chatRef, orderBy("time", "asc"));
  const [value, loading] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    var objDiv = document.getElementById("chat_body");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [value]);

  useEffect(() => {
    if (user.length === 0 && !showPopupUser) {
      setShowPopupUser(true);
    }
  }, [user]);

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
        <div
          className="flex flex-1 flex-col px-5 overflow-y-auto scroll-smooth"
          id="chat_body"
        >
          {loading ? (
            <p className="text-white py-2">Loading...</p>
          ) : (
            value?.docs?.map((doc) => (
              <div
                key={doc.id}
                className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl"
              >
                <p className="text-base font-semibold mb-1">
                  {doc.data()["user"] || "Anonim"}
                </p>
                {doc.data()["chat"]}
              </div>
            ))
          )}
          {/* {chats?.map((item) => (
            <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
              <p className="text-base font-semibold mb-1">Deni</p>
              {item.chat}
            </div>
          ))} */}
          {/* <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="px-3 py-2 text-white bg-black-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-r-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div>
          <div className="self-end px-3 py-2 text-black bg-cream-bubble-chat border border-black-border h-max w-3/4 my-2 text-sm rounded-t-xl rounded-l-xl">
            <p className="text-base font-semibold mb-1">Deni</p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            asperiores soluta nobis iste dolorum incidunt, veniam labore,{" "}
          </div> */}
        </div>
        <div className="w-full bg-black-sidebar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveChat();
            }}
            className="w-full flex items-center py-2 px-5 gap-5"
          >
            <input
              type="text"
              className="border border-black-border px-4 py-3 flex-1 rounded-full bg-black-sidebar text-white focus:outline-0 focus:bg-black-border focus:ring-0"
              placeholder="Ketik pesan"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
            />
            <button
              type="submit"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-cream-bubble-chat"
            >
              <Image src={IcSend} width={30} height={30} alt="send" />
            </button>
          </form>
        </div>
      </div>
      {showPopupUser && (
        <div className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-75 flex items-center justify-center flex-col">
          <h1 className="text-white text-2xl mb-4">Maneh saha teh?</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (user.length === 0) {
                alert("isi dulu lah");
                return;
              }
              setShowPopupUser(false);
            }}
            className="flex flex-col"
          >
            <input
              type="text"
              className="border border-black-border px-4 py-3 flex-1 rounded-full bg-black-sidebar text-white focus:outline-0 focus:bg-black-border focus:ring-0 mb-2 w-64"
              placeholder="Ketik nama anda"
              value={user}
              onChange={({ target: { value } }) => setUser(value)}
            />
            <button
              type="submit"
              className="bg-cream-bubble-chat rounded-full px-10 py-3"
            >
              Simpan
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default Home;
