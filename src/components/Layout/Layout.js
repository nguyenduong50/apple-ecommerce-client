import { Fragment, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.css';

const Layout = () => {
    const [isChat, setIsChat] = useState(false);

    const showChatHandler = () => {
        setIsChat(!isChat);
    }

    return(
        <Fragment>
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

                    <div className="row px-4 mt-0 d-flex flex-column fst-italic">
                        <span className="align-self-end rounded-1 py-2 bg-info text-white my-1" style={{width: "80%"}}>Xin chào</span>
                        <span className="align-self-end rounded-1 py-2 bg-info text-white my-1" style={{width: "80%"}}>Làm thế nào để xem các sản phẩm</span>

                        <span className="align-self-start rounded-1 py-2 bg-body-tertiary text-secondary my-1" style={{width: "80%"}}>ADMIN: Chào bạn</span>
                        <span className="align-self-start rounded-1 py-2 bg-body-tertiary text-secondary my-1" style={{width: "80%"}}>ADMIN: Bạn có thể vào mục shop để xem các sản phẩm</span>
                    </div>

                    <div className="row px-2 py-3 border-top">
                        <div className="col-6">
                            <input type="text" placeholder="Enter Message!" className="form-control rounded-0 py-1" />
                        </div>

                        <div className="col-6 d-flex align-items-center gap-2">
                            <button className="border-0 bg-transparent text-secondary"><i className="fa-solid fa-paperclip"></i></button>
                            <button className="border-0 bg-transparent text-secondary"><i class="fa-solid fa-face-smile"></i></button>
                            <button className="border-0 bg-transparent text-primary"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Layout;