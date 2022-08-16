import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { database } from '../firebaseConfig';
import IcSend from '../public/img/send.webp';
import Avatar from './components/avatar/avatar';
import BubbleChat from './components/card/bubble-chat';
import CardChat from './components/card/card-chat';

function Home() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [showAddChat, setShowAddChat] = useState(false);
  const [newChat, setNewChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [listChat, setListChat] = useState([]);
  const [chatActive, setChatActive] = useState({
    chat_id: "",
    image: "",
    name: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    image: "",
    name: "",
    id: "",
  });

  const saveChat = async () => {
    if (message.length === 0) {
      alert("Isi pesannya dulu lah!!");
      return;
    }
    let date = new Date();
    const chatRef = collection(
      database,
      `chats/${chatActive.chat_id}/messages`
    );
    let tgl = date.getDate();
    let bulan = date.getMonth() + 1;
    let tahun = date.getFullYear();
    // simpan pesan
    await addDoc(chatRef, {
      chat: message,
      time: date,
      sender: userData.id,
      date: `${tgl}-${bulan}-${tahun}`,
    }).then(() => {
      setMessage("");
    });

    // update data chats punya kita
    const ownChat = doc(
      database,
      "users",
      userData.id,
      "chats",
      chatActive.chat_id
    );
    await updateDoc(ownChat, {
      ...chatActive,
      last_message: message,
      last_time: date,
    });

    // update data chats punya temen
    const friendChat = doc(
      database,
      "users",
      chatActive.connection,
      "chats",
      chatActive.chat_id
    );
    const friendCol = collection(
      database,
      "users",
      chatActive.connection,
      "chats"
    );
    const queryFriend = query(
      friendCol,
      where("connection", "==", userData.id)
    );
    const friendChatData = await getDocs(queryFriend);
    if (friendChatData.empty) {
      await setDoc(friendChat, {
        chat_id: chatActive.chat_id,
        connection: userData.id,
        image: userData.image,
        last_message: message,
        last_time: date,
        name: userData.name,
        unread: 1,
      });
    } else {
      let data = friendChatData.docs.map((doc) => doc.data());
      await updateDoc(friendChat, {
        ...data[0],
        last_message: message,
        last_time: date,
        unread: data[0]?.unread + 1 || 1,
      });
    }
  };

  useEffect(() => {
    async function getUser() {
      const userRef = collection(database, "users");
      const queryUser = query(
        userRef,
        where("email", "==", session?.user?.email)
      );
      const user = await getDocs(queryUser);
      const data = user.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));
      setUserData(data[0]);
    }

    getUser();
  }, []);

  useEffect(() => {
    if (userData.id) {
      const userChatRef = collection(database, `users/${userData.id}/chats`);
      const queryUserChats = query(userChatRef, orderBy("last_time", "desc"));
      onSnapshot(queryUserChats, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => doc.data());
        if (data) {
          setListChat(data);
        }
      });
    }
  }, [userData]);

  useEffect(() => {
    if (chatActive.chat_id) {
      var objDiv = document.getElementById("chat_body");
      objDiv.scrollTop = objDiv?.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatActive.chat_id) {
      const messageRef = collection(
        database,
        `chats/${chatActive?.chat_id}/messages`
      );
      const queryChats = query(messageRef, orderBy("time", "asc"));
      onSnapshot(queryChats, (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    }
  }, [chatActive]);

  const handleNewChat = async (e) => {
    e.preventDefault();
    const date = new Date();
    let chatData;
    let create_new = false;

    // Cek email kosong ap engga
    if (newChat.length <= 0) {
      alert(`${newChat} saha anying?`);
      return;
    }

    // Cek email sama dengan email dia ap engga
    if (newChat === userData?.email) {
      alert("Yo ra iso chatan karo dirine dewek!!");
      return;
    }

    // Cek email ada ap engga
    const userRef = collection(database, "users");
    const queryUser = query(userRef, where("email", "==", newChat));
    const docUser = await getDocs(queryUser);
    if (docUser.empty) {
      alert(`${newChat} or ketemu lur`);
      return;
    }
    let newChatProfile = docUser.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    // cek ada koneksi dia apa engga
    if (listChat.length > 0) {
      listChat.forEach((data) => {
        if (data?.connection === newChatProfile[0].id) chatData = data;
      });
      if (chatData) {
        create_new = false;
      } else {
        create_new = true;
      }
    } else {
      create_new = true;
    }

    if (create_new) {
      const chatsRef = collection(database, "chats");
      const queryChat = query(
        chatsRef,
        where("connection", "in", [
          [newChatProfile[0].id, userData.id],
          [userData.id, newChatProfile[0].id],
        ])
      );
      let docChats = await getDocs(queryChat);
      if (docChats.empty) {
        // add chat
        const chatRef = collection(database, "chats");
        const chat = await addDoc(chatRef, {
          messages: [],
          connection: [newChatProfile[0].id, userData.id],
        });

        const userCol = doc(database, "users", userData.id, "chats", chat.id);
        let newChat = {
          connection: newChatProfile[0].id,
          chat_id: chat.id,
          last_time: date,
          unread: 0,
          last_message: "",
          image: newChatProfile[0].image,
          name: newChatProfile[0].name,
        };
        await setDoc(userCol, newChat);
        chatData = newChat;
      } else {
        const userCol = doc(
          database,
          "users",
          userData.id,
          "chats",
          chatData.chat_id
        );
        let newChat = {
          connection: newChatProfile[0].id,
          chat_id: chatData.chat_id,
          last_time: date,
          unread: 0,
          last_message: "",
          image: newChatProfile[0].image,
          name: newChatProfile[0].name,
        };
        await setDoc(userCol, newChat);
        chatData = newChat;
      }
    }
    setNewChat("");
    setShowAddChat(false);
    setChatActive(chatData);
  };

  return (
    <main className="h-screen w-screen bg-black-sidebar grid grid-cols-12">
      <div className="col-span-4 lg:col-span-3 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black-border ">
          <div className="flex items-center gap-4">
            <img
              className="bg-cream-bubble-chat h-10 w-10 rounded-full"
              src={session?.user?.image}
              alt={session?.user?.name}
              referrerPolicy="no-referrer"
            />
            <p className="text-2xl text-white">{session?.user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 focus:bg-black-border rounded-full border-black-border flex items-center justify-center"
              onClick={() => setShowAddChat(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 19.7494C3.41667 19.7494 3.125 19.6243 2.875 19.3743C2.625 19.1243 2.5 18.8327 2.5 18.4994V5.99935C2.5 5.66602 2.625 5.37435 2.875 5.12435C3.125 4.87435 3.41667 4.74935 3.75 4.74935H12.1875L10.9375 5.99935H3.75V18.4994H16.25V11.2493L17.5 9.99935V18.4994C17.5 18.8327 17.375 19.1243 17.125 19.3743C16.875 19.6243 16.5833 19.7494 16.25 19.7494H3.75ZM13.7917 4.91602L14.6875 5.79102L8.75 11.7077V13.4993H10.5208L16.4792 7.54102L17.3542 8.41602L11.4167 14.3743C11.3056 14.4855 11.1701 14.5757 11.0104 14.6452C10.8507 14.7146 10.6875 14.7493 10.5208 14.7493H8.125C7.94444 14.7493 7.79514 14.6903 7.67708 14.5723C7.55903 14.4542 7.5 14.3049 7.5 14.1243V11.7285C7.5 11.5618 7.53472 11.3987 7.60417 11.2389C7.67361 11.0792 7.76389 10.9438 7.875 10.8327L13.7917 4.91602ZM17.3542 8.41602L13.7917 4.91602L15.875 2.83268C16.1111 2.59657 16.4062 2.47852 16.7604 2.47852C17.1146 2.47852 17.4097 2.60352 17.6458 2.85352L19.3958 4.62435C19.6319 4.87435 19.75 5.16949 19.75 5.50977C19.75 5.85004 19.625 6.13824 19.375 6.37435L17.3542 8.41602Z"
                  className="fill-cream-bubble-chat"
                />
              </svg>
            </button>
            <button
              className="w-10 h-10 focus:bg-black-border rounded-full border-black-border flex items-center justify-center"
              onClick={signOut}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.775 16.2502C9.625 16.1002 9.55 15.9127 9.55 15.6877C9.55 15.4627 9.625 15.2752 9.775 15.1252L12.15 12.7502H3.75C3.53333 12.7502 3.35417 12.6794 3.2125 12.5377C3.07083 12.396 3 12.2169 3 12.0002C3 11.7835 3.07083 11.6044 3.2125 11.4627C3.35417 11.321 3.53333 11.2502 3.75 11.2502H12.15L9.75 8.8502C9.6 8.7002 9.525 8.52103 9.525 8.3127C9.525 8.10436 9.60833 7.91686 9.775 7.7502C9.925 7.6002 10.1125 7.5252 10.3375 7.5252C10.5625 7.5252 10.75 7.6002 10.9 7.7502L14.625 11.4752C14.7083 11.5585 14.7667 11.6419 14.8 11.7252C14.8333 11.8085 14.85 11.9002 14.85 12.0002C14.85 12.1002 14.8333 12.1919 14.8 12.2752C14.7667 12.3585 14.7083 12.4419 14.625 12.5252L10.875 16.2752C10.7417 16.4252 10.5667 16.5002 10.35 16.5002C10.1333 16.5002 9.94167 16.4169 9.775 16.2502ZM4.5 21.0002C4.1 21.0002 3.75 20.8502 3.45 20.5502C3.15 20.2502 3 19.9002 3 19.5002V15.0002C3 14.7835 3.07083 14.6044 3.2125 14.4627C3.35417 14.321 3.53333 14.2502 3.75 14.2502C3.96667 14.2502 4.14583 14.321 4.2875 14.4627C4.42917 14.6044 4.5 14.7835 4.5 15.0002V19.5002H19.5V4.4502H4.5V9.0002C4.5 9.21686 4.42917 9.39603 4.2875 9.5377C4.14583 9.67936 3.96667 9.7502 3.75 9.7502C3.53333 9.7502 3.35417 9.67936 3.2125 9.5377C3.07083 9.39603 3 9.21686 3 9.0002V4.4502C3 4.0502 3.15 3.7002 3.45 3.4002C3.75 3.1002 4.1 2.9502 4.5 2.9502H19.5C19.9 2.9502 20.25 3.1002 20.55 3.4002C20.85 3.7002 21 4.0502 21 4.4502V19.5002C21 19.9002 20.85 20.2502 20.55 20.5502C20.25 20.8502 19.9 21.0002 19.5 21.0002H4.5Z"
                  className="fill-cream-bubble-chat"
                />
              </svg>
            </button>
          </div>
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
            {listChat?.map((item) => {
              return (
                <CardChat
                  id={item.chat_id}
                  key={item.chat_id}
                  name={item?.name}
                  profile={item?.image}
                  message={item?.last_message}
                  unread={item?.unread}
                  handleClick={() => setChatActive(item)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {chatActive?.chat_id ? (
        <div className="col-span-8 lg:col-span-9 h-screen bg-black-bg-chat flex flex-col">
          {/* Header */}
          <div className="px-5 flex items-center gap-4 py-4 border-b border-black-border bg-black-sidebar">
            <img
              className="bg-cream-bubble-chat h-10 w-10 rounded-full"
              src={chatActive?.image}
              referrerPolicy="no-referrer"
            />
            <p className="text-2xl text-white">{chatActive?.name}</p>
          </div>
          {/* Chat body */}
          <div
            className="flex flex-1 flex-col px-5 overflow-y-auto scroll-smooth"
            id="chat_body"
          >
            {messages?.map((doc, i) => {
              if (i <= 0) {
                return (
                  <div key={doc.id} className="flex flex-col">
                    <div className="py-2 px-6 text-cream-bubble-chat mx-auto bg-black-sidebar w-max rounded-md my-4 opacity-80 text-xs border border-black-border">
                      10/8/2022
                    </div>
                    <BubbleChat
                      key={doc.id}
                      chat={doc.chat}
                      myChat={doc.sender === userData.id}
                      time={doc.time}
                    />
                  </div>
                );
              } else if (doc.date !== messages[i - 1].date) {
                return (
                  <div key={doc.id} className="flex flex-col">
                    <div className="py-2 px-6 text-cream-bubble-chat mx-auto bg-black-sidebar w-max rounded-md my-4 opacity-80 text-xs border border-black-border">
                      10/8/2022
                    </div>
                    <BubbleChat
                      key={doc.id}
                      chat={doc.chat}
                      myChat={doc.sender === userData.id}
                      time={doc.time}
                    />
                  </div>
                );
              } else {
                return (
                  <BubbleChat
                    key={doc.id}
                    chat={doc.chat}
                    myChat={doc.sender === userData.id}
                    time={doc.time}
                  />
                );
              }
            })}
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
      ) : (
        <div className="col-span-8 lg:col-span-9 h-screen bg-black-bg-chat flex flex-col">
          <p className="text-center">Hola</p>
        </div>
      )}
      <div
        className={`fixed h-screen bg-black-bubble-chat flex items-center justify-center bg-opacity-90 ${
          showAddChat
            ? "opacity-100 top-0 w-screen left-0"
            : "opacity-0 top-full w-64"
        } ease-out duration-300`}
      >
        <div className="p-5 pt-7 border border-black-border rounded-lg relative">
          <button
            className="p-1 rounded-full absolute -top-3 -right-3 border border-cream-bubble-chat"
            onClick={() => setShowAddChat(false)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00039 8.70039L4.50039 12.2004C4.40039 12.3004 4.28372 12.3504 4.15039 12.3504C4.01706 12.3504 3.90039 12.3004 3.80039 12.2004C3.70039 12.1004 3.65039 11.9837 3.65039 11.8504C3.65039 11.7171 3.70039 11.6004 3.80039 11.5004L7.30039 8.00039L3.80039 4.50039C3.70039 4.40039 3.65039 4.28372 3.65039 4.15039C3.65039 4.01706 3.70039 3.90039 3.80039 3.80039C3.90039 3.70039 4.01706 3.65039 4.15039 3.65039C4.28372 3.65039 4.40039 3.70039 4.50039 3.80039L8.00039 7.30039L11.5004 3.80039C11.6004 3.70039 11.7171 3.65039 11.8504 3.65039C11.9837 3.65039 12.1004 3.70039 12.2004 3.80039C12.3004 3.90039 12.3504 4.01706 12.3504 4.15039C12.3504 4.28372 12.3004 4.40039 12.2004 4.50039L8.70039 8.00039L12.2004 11.5004C12.3004 11.6004 12.3504 11.7171 12.3504 11.8504C12.3504 11.9837 12.3004 12.1004 12.2004 12.2004C12.1004 12.3004 11.9837 12.3504 11.8504 12.3504C11.7171 12.3504 11.6004 12.3004 11.5004 12.2004L8.00039 8.70039Z"
                className="fill-cream-bubble-chat"
              />
            </svg>
          </button>
          <h1 className="text-cream-bubble-chat text-3xl mb-7 text-center font-medium">
            Emailnya apa teh?
          </h1>
          <form onSubmit={handleNewChat}>
            <input
              type="email"
              className="border border-black-border px-4 py-3 flex-1 rounded-full bg-black-sidebar text-white focus:outline-0 focus:bg-black-border focus:ring-0 w-full"
              placeholder="Ketik email"
              value={newChat}
              onChange={({ target: { value } }) => setNewChat(value)}
            />
            <button
              type="submit"
              className="w-full border-black-border border py-3 mt-3 bg-cream-bubble-chat rounded-full font-medium"
            >
              Mulai Chat
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  return {
    props: { session },
  };
}
