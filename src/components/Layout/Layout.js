import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import classes from './Layout.module.css';
import socketIOClient from 'socket.io-client'
// import { createRandomString } from '../../Util/randomString';

const Layout = () => {
    const [isChat, setIsChat] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();
    let socket = socketIOClient('http://localhost:5000', {credentials: 'includes'});

    const showChatHandler = async() => {
        if(!currentUser){
            navigate('/login');
            return;
        }
        setIsChat(!isChat);

        if(!isChat){
            const response = await fetch(
                'http://localhost:5000/v2/roomchat',
                {
                    credentials: 'include'
                }
            );
            const data = await response.json();
            const roomExisted = data.find(room => room.userId.toString() === currentUser._id)

            if(!roomExisted){
                const roomChat = {
                    name: currentUser.name,
                    userId: currentUser._id
                }
        
                const newRoomIdResponse = await fetch(
                    'http://localhost:5000/v2/roomchat',
                    {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(roomChat),
                        credentials: 'include'
                    }
                )
                const newRoomId = await newRoomIdResponse.json();
                socket.emit('join-room', newRoomId);
                localStorage.setItem('roomChatId', newRoomId._id);
            }

            if(roomExisted){
                socket.emit('join-room', roomExisted._id);
                localStorage.setItem('roomChatId', roomExisted._id);
            }
        }

        setMessages([]);
    }

    
    const messageHandle = async() => {
        if(message !== ''){
            const messageReq = {
                roomId: localStorage.getItem('roomChatId'),
                userId: currentUser?._id,
                content: message
            }

            await fetch(
                'http://localhost:5000/v2/message',
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageReq),
                    credentials: 'include'
                }
            )

            socket.emit('send-message', messageReq)
            setMessage('');
            setMessages(prev => prev.concat({message: message, isAdmin: false}))
        }
    }

    const keyHandleMessage = (event) => {
        if(event.key === 'Enter'){
            messageHandle();
        }
    }

    useEffect(() => {
        socket.on('response-message', data => {
            if(data.userId !== currentUser?._id){
                setMessages(prev => prev.concat({message: data.content, isAdmin: true}))
            }
        })
    },[socket, currentUser])

    return(
        <>
            <Header/>
            <main className="container">
                <Outlet />
            </main>
            <Footer />
            
            <button id={classes["btn-chat"]} className={`border-0 bg-transparent text-primary`} onClick={showChatHandler}>
                <i className="fa-brands fa-facebook-messenger"></i>
            </button>
            {
                isChat &&
                <div id={classes["form-chat"]} className='container d-flex flex-column justify-content-between'>
                    <div className="row px-4 py-3 border-bottom">
                        <span className="col-6 ps-0 fw-bold">Customer Support</span>
                        <div className="col-6 pe-0 d-flex justify-content-end">
                            <button className="border-0 fst-italic px-2 text-body-secondary" style={{fontSize: "14px"}}>Let's Chat App</button>
                        </div>
                    </div>

                    <div className="px-4 mt-0 d-flex flex-column fst-italic overflow-auto" style={{height: '100%'}}>
                        {
                            messages?.length > 0 &&
                            messages.map((message, index) => {
                                if(!message.isAdmin){
                                    return(
                                        <span className="align-self-end rounded-1 py-2 bg-info text-white my-1" style={{width: "80%"}} key={index}>
                                            {message.message}
                                        </span>
                                    )
                                }

                                if(message.isAdmin){
                                    return(
                                        <span className="align-self-start rounded-1 py-2 bg-body-tertiary text-secondary my-1" style={{width: "80%"}} key={index}>
                                            Admin: {message.message}
                                        </span>
                                    )
                                }

                                return null;
                            })
                        }
                    </div>

                    <div className="row px-2 py-3 border-top">
                        <div className="col-9">
                            <input 
                                type="text" 
                                placeholder="Enter Message!" 
                                className="form-control rounded-0 py-1"
                                value={message}
                                onKeyDown={keyHandleMessage} 
                                onChange={(event) => setMessage(event.target.value)} 
                            />
                        </div>

                        <div className="col-3 d-flex align-items-center gap-2">
                            <button className="border-0 bg-transparent text-secondary"><i className="fa-solid fa-paperclip"></i></button>
                            <button className="border-0 bg-transparent text-secondary"><i className="fa-solid fa-face-smile"></i></button>
                            <button className="border-0 bg-transparent text-primary" onClick={messageHandle}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Layout;