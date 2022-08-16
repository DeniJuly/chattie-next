import React from 'react';

function BubbleChat({ chat, myChat, time }) {
  let timeData = new Date(time.seconds * 1000);
  return (
    <div
      className={`w-max flex flex-col my-2 ${
        myChat ? "self-end items-end" : "items-start"
      }`}
    >
      <div
        className={`px-3 py-2 border h-max my-2 text-sm max-w-3/4 ${
          myChat
            ? "self-end text-black bg-cream-bubble-chat border-black-border rounded-t-xl rounded-l-xl w-max"
            : "text-white bg-black-bubble-chat border-black-border rounded-t-xl rounded-r-xl w-max"
        }`}
      >
        {chat}
      </div>
      <p className="text-white text-[10px] opacity-50">{`${timeData.getHours()}:${timeData.getMinutes()}`}</p>
    </div>
  );
}

export default BubbleChat;
