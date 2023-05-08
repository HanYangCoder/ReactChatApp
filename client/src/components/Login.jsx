import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from './DataContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { storeUserData } = useContext(DataContext)

    const handleLogin = () => {
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Login successful, display a success message
                console.log(data.message);

                const userData = { userId: data.id, username: data.username }

                console.log("Logged in as", userData.username);

                storeUserData(userData)

                navigate('/home');
            } else {
                // Login failed, display an error message
                console.log(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="container shadow login-style">
            <h1>Welcome to CoolTalk!</h1>

            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>


            <button className="btn btn-primary btn-block mb-3" onClick={handleLogin}>Login</button>
        </div>
        
    )
}

export default Login