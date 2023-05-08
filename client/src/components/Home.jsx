import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './DataContext';

const Home = () => {

    const [chatrooms, setChatrooms] = useState([]);
    const { userData, socket } = useContext(DataContext)

    useEffect(() => {
        fetch('http://localhost:3001/chatrooms')
            .then(response => response.json())
            .then(data => {
                setChatrooms(data);
            })
            .catch(error => {
                console.log('Error:', error);
        });
    }, []);
    
    return (
        <div className="container-fluid container-md shadow p-4">
            <h1 className="mb-4">Welcome {userData.username}!</h1>
            {console.log(`welcome ${userData.username}`)}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {(!chatrooms.length==0) ? 
                    chatrooms.map((chatroom) => {
                        const chatRoomId = chatroom.room_id;
                        return (
                            <Link key={chatRoomId} className='btn btn-primary d-block mb-2 shadow' style={{ maxWidth: '500px' }} to={`/chat/${chatRoomId}`}>Enter Chat Room {chatRoomId}
                            </Link>
                        )
                    })
                : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Home