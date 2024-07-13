'use client';

import { useState, useRef, useEffect } from 'react';
import BotTyping from './BotTyping';
import { useAppDispatch } from '@/lib/hooks';
import { showAlert } from '@/lib/alertSlice';

interface chatType {
    response: string
}

const ChatBot: React.FC = () => {
    const dispatch = useAppDispatch();
    const [token, setToken] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'Pyxell', text: 'Hi, how can I help you today?' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    

    const getReply = async (message: string): Promise<string | undefined> => {
        setIsBotTyping(true);
        try {
            const url = "https://pyxell-agent-np8u.onrender.com/chat/";

            const data = new URLSearchParams({
                'prompt': message
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            });

            if (response.ok) {
                const data: chatType = await response.json();
                setIsBotTyping(false);
                if (data)
                    return data.response;
            } else {
                setIsBotTyping(false);
                dispatch(showAlert({ color: 'red', message: 'An error occurred. Please try again.' }));
            }
        } catch (error) {
            setIsBotTyping(false);
            console.error(error);
            dispatch(showAlert({ color: 'red', message: 'An error occurred. Please try again.' }));
        }
    }

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (input.trim()) {
            const userMessage = input;
            setInput('');

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'You', text: userMessage },
            ]);

            const botReply = await getReply(userMessage);

            if (botReply) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'Pyxell', text: botReply },
                ]);
            }
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem('token') || '');
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div>
            <div className='bg-gradient-to-br from-purple-700 to-pink-500 h-screen flex items-center overflow-y-hidden'>
                <div
                    style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    className="bg-white relative p-6 pt-2 rounded-lg border border-[#e5e7eb] w-[80%] h-[90vh] max-h-[630px] mx-auto"
                >
                    <div className="flex space-y-1.5 pb-6 mt-2 justify-center">
                        <h2 className="font-semibold text-3xl text-purple-700">Pyxell AI</h2>
                    </div>
                    <div className="pr-4 h-[400px] sm:h-[454px] md:h-[464px] overflow-y-auto hide-scrollbar">
                        {messages.map((message, index) => (
                            <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className="rounded-full bg-gray-100 border p-1">
                                        <svg
                                            stroke="none"
                                            fill={message.sender === 'Pyxell' ? '#6D28D9' : 'black'}
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                            height="20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d={
                                                    message.sender === 'Pyxell'
                                                        ? "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                                        : "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
                                                }
                                            />
                                        </svg>
                                    </div>
                                </span>
                                <p className="leading-relaxed">
                                    <span className={`block font-bold  ${message.sender === 'Pyxell' ? 'text-[#6D28D9]' : 'text-gray-700'}`}>{message.sender}</span> {message.text}
                                </p>
                            </div>
                        ))}
                        {isBotTyping && (<div className='flex -mt-5 items-center text-gray-600 text-sm flex-1'>
                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                <div className="rounded-full bg-gray-100 border p-1">
                                    <svg
                                        stroke="none"
                                        fill={'#6D28D9'}
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        height="20"
                                        width="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d={
                                                "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                            }
                                        />
                                    </svg>
                                </div>
                            </span>
                            <div className='-ml-3'>
                                <BotTyping />
                            </div>
                        </div>)}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex fixed bottom-20 items-center pt-4 fixed-child">
                        <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSendMessage}>
                            <input
                                className="flex h-10 w-full rounded-xl border border-gray-400 px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-gray-500 disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                placeholder="Type your message"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                className="inline-flex items-center justify-center rounded-lg text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-purple-700 hover:bg-purple-900 h-10 px-4 py-2"
                                type="submit"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
