import './App.css'
import './Chat.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home';
import Chat from './components/Chat';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/chat/:roomId" element={<Chat />} />
    </Routes>
  )
}

export default App
