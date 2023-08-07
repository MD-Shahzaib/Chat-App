// MY-CODE
import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, userName, room }) => {

    const [currentMsg, setCurrentMsg] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMsg = async () => {
        if (!currentMsg) return alert("write something");
        const msgDate = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        const messageData = {
            room: room,
            author: userName,
            message: currentMsg,
            time: msgDate
        };
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData])
        setCurrentMsg('');
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        });
    }, [socket])

    const clearChat = () => {
        setMessageList([]);
    }

    return (
        <div className='p-5 bg-gray-800 text-white flex justify-center items-center flex-col min-h-screen'>
            <header className='bg-green-600 w-full flex justify-between items-center p-4'>
                <span>MyChat ({room})</span>
                <span>({userName ? userName : "(SHAH)"})</span>
                <span onClick={clearChat} >clear Chat</span>
            </header>
            <main className='w-full bg-slate-300 text-black'>
                <ScrollToBottom className='h-60'>
                    {messageList.map((msg, index) => {
                        return (
                            <div
                                key={index}
                                className={`${userName !== msg.author ? "text-right bg-blue-500" : "text-left bg-green-500"}`}
                            >
                                <p>{msg.message}</p>
                                <p>{msg.time}</p>
                                <p>{msg.author}</p>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </main>
            <footer className='bg-green-700 w-full flex justify-between items-center p-4'>
                <input
                    type="text"
                    className='p-2 bg-slate-300 rounded text-black'
                    placeholder='Type message'
                    value={currentMsg}
                    onKeyPress={(e) => { e.key === "Enter" && sendMsg() }}
                    onChange={(e) => { setCurrentMsg(e.target.value) }}
                />
                <button
                    type="button"
                    onClick={sendMsg}
                    className='rounded bg-slate-50 p-1 text-black'>
                    Send
                </button>
            </footer>
        </div>
    )
}

export default Chat;