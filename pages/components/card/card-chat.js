import React from 'react';

function CardChat() {
  return (
    <div className="flex items-center gap-5 mx-5 py-3 border-b border-black-border">
      <div className="aspect-square w-14 bg-cream-bubble-chat rounded-full"></div>
      <div className="w-fit">
        <p className="text-white text-base w-fit">Deni Juli Setiawan</p>
        <p className="w-fit text-ellipsis text-white opacity-75">
          Lorem ipsum, dolor sit amet
        </p>
      </div>
    </div>
  );
}

export default CardChat;
