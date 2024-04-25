import { Form, NavLink, useNavigate } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useState } from 'react';

const MainNavigation = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [displayOrderMenu, setDisplayOrderMenu] = useState(false);
    const navigate = useNavigate();

    const orderHistoryPageHandle = () => {
        setDisplayOrderMenu(!displayOrderMenu);
        navigate('/order-history');
    }

    return(
        <div className={`${classes['main-navigation']} row pt-2`}>
            <nav className={`${classes['menu']} col-md-4`}>
                <ul className="row column-gap-4">
                    <li className="col-md-1">
                        <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined} end>
                            Home
                        </NavLink>
                    </li>
                    <li className="col-md-1">
                        <NavLink to="/shop" className={({isActive}) => isActive ? classes.active : undefined}>
                            Shop
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={`${classes['brand']} col-md-4 d-none d-md-block`}>
                <h1 className="text-center">Boutique</h1>
            </div>
            <div className="col-md-4">
                <ul className="d-flex align-items-center justify-content-end">
                    {
                        !currentUser &&
                        <li className="d-flex justify-content-end align-items-center me-2">
                            <i className="fa-solid fa-cart-shopping me-2 d-none d-lg-inline"></i>
                            <NavLink to="/cart" className={({isActive}) => isActive ? classes.active : undefined}>
                                Cart
                            </NavLink>
                        </li>
                    }
                    {
                        currentUser &&
                        <li className="d-flex justify-content-end align-items-center me-2">
                            <i className="fa-solid fa-cart-shopping me-2 d-none d-lg-inline"></i>
                            <NavLink to="/cart" className={({isActive}) => isActive ? classes.active : undefined}>
                                Cart
                            </NavLink>
                        </li>
                    }
                    {
                        !currentUser &&
                        <li className="d-flex justify-content-end align-items-center me-2">
                            <i className="fa-solid fa-user me-2 d-none d-lg-inline"></i>
                            <NavLink to="/login" className={({isActive}) => isActive ? classes.active : undefined}>
                                Login
                            </NavLink>
                        </li>
                    }
                    {
                        currentUser &&
                        <li className="d-flex align-items-center" style={{position: 'relative'}}>
                            <i className="fa-solid fa-user me-2 d-none d-lg-inline me-2"></i>
                            <span className='me-2' onClick={() => setDisplayOrderMenu(!displayOrderMenu)} style={{cursor: 'pointer'}}>
                                {currentUser?.name.length < 5 ? currentUser?.name : currentUser?.name.slice(0, 7)}
                                <i className="fa-solid fa-caret-down ms-1"></i>
                            </span>
                            <span 
                                style={{
                                    position: 'absolute', 
                                    top: '20px', 
                                    left: '30px', 
                                    backgroundColor: '#fff',
                                    display: `${displayOrderMenu ? 'block' : 'none'}`,
                                    cursor: 'pointer'
                                }}
                                onClick={orderHistoryPageHandle}
                            >
                                Order
                            </span>
                            <Form action="/logout" method="post" className='ms-3'>
                                <button className='fst-italic border-0 bg-white'>(Logout)</button>
                            </Form>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default MainNavigation;