import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { DataContext } from './DataContext';
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = () => {
    const { userData, socket } = useContext(DataContext)
    const { roomId } = useParams()
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                id: crypto.randomUUID(),
                room: roomId,
                author: userData.username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        const receiveMessageListener = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", receiveMessageListener);

        return () => {
            socket.off("receive_message", receiveMessageListener);
        };
    }, [socket]);

    useEffect(() => {
        socket.emit("join_room", roomId);

        return () => {
        // Clean up the socket event listener when the component is unmounted
            socket.off("receive_message");
        };
    }, [])

    return (
        <div className='chat-window shadow'>
            <div className='chat-header'>
                Chat Room {roomId}
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent) => {
                        return (
                            <div key={messageContent.id} className='message' id={userData.username === messageContent.author ? "you": "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type='text'
                    value={currentMessage}
                    placeholder='Hey...'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat