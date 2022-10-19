import React from 'react';

function CardChat({ id, profile, name, message, unread, handleClick }) {
  return (
    <div className="w-full px-5" key={id}>
      <button
        className="w-full flex items-center gap-5 py-3 border-b border-black-border"
        onClick={handleClick}
      >
        <img
          className="aspect-square w-10 bg-cream-bubble-chat rounded-full"
          src={profile}
          alt={name}
          referrerPolicy="no-referrer"
        />
        <div className="overflow-hidden flex items-center gap-1 justify-between w-full">
          <div className="flex-1 overflow-hidden">
            <p className="text-white text-base w-fit">{name}</p>
            <p className="w-full truncate text-white opacity-75 text-sm text-left">
              {message}
            </p>
          </div>
          {unread ? (
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium aspect-square text-black-bubble-chat bg-cream-bubble-chat">
              {unread}
            </div>
          ) : (
            ""
          )}
        </div>
      </button>
    </div>
  );
}

export default CardChat;
