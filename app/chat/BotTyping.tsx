import React from 'react';

const BotTyping: React.FC = () => {
  return (
    <div className="flex space-x-1 m-8">
      <span className="w-2.5 h-2.5 bg-pink-500 inline-block rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="w-2.5 h-2.5 bg-pink-500 inline-block rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-2.5 h-2.5 bg-pink-500 inline-block rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
    </div>
  );
};

export default BotTyping;