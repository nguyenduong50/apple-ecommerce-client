import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { cartActions } from "../../store";

const Checkout = () => {
    const cart = useSelector(state => state.cart.items);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [totalBill, setTotalBill] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Input data
    const [name, setName] = useState(currentUser?.name ?? '');
    const [email, setEmail] = useState(currentUser?.email ?? '');
    const [phone, setPhone] = useState(currentUser?.phone ?? '');
    const [address, setAddress] = useState('');

    const orderHandle = async(e) => {
        e.preventDefault();
        //set productOrder by currentUser
        const productOrder = cart.filter(cartItem => cartItem.userId === currentUser?._id)

        //Send Request Order
        const order = {
            userId: currentUser._id,
            name: name,
            email: email,
            phone: phone,
            address: address,
            productOrder: productOrder
        }
        const response = await fetch(
            'http://localhost:5000/v2/order',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order),
                credentials: 'include'
            }
        )

        console.log(response)

        //Update cart at LocalStorage
        const newCart = cart.filter(cartItem => cartItem.userId !== currentUser?._id);
        localStorage.setItem('cart', JSON.stringify(newCart));

        //Reload cart Redux
        dispatch(cartActions.reloadCart());
        navigate('/');
    }

    useEffect(() => {
        let bill_tempo = 0;

        for(let index in cart){
            if(cart[index].userId === currentUser._id){
                bill_tempo += cart[index].totalPrice; 
            }    
        }

        setTotalBill(bill_tempo);
    }, [cart, currentUser?._id])

    return(
        <div className="container">
            <h5 className="row mt-4 px-0 fst-italic">BULDING DETAILS</h5>
            <div className="row">
                <form className="col-lg-8 ps-0 text-uppercase fst-italic">
                    <label className="form-lable">Full Name:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Full Name Here!" 
                        className="form-control rounded-0 my-2" 
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label className="form-lable">Email:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Email Here!" 
                        className="form-control rounded-0 my-2"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label className="form-lable">Phone Number:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Phone Number Here!" 
                        className="form-control rounded-0 my-2"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                    <label className="form-lable">Address:</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Address Here!" 
                        className="form-control rounded-0 my-2"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                    <button className="btn btn-dark rounded-0 mt-1 fst-italic" onClick={orderHandle}>Place order</button>
                </form>
                <div className="col-lg-4 px-5 py-4 bg-body-secondary fst-italic" >
                    <p className=" fs-4">Your order</p>
                    {
                        cart.map((product, index) => (
                            product.userId === currentUser._id &&
                            <div className="row border-bottom border-dark-subtle mt-1 px-3 pb-2" key={index}>
                                <span className="col-md-6 px-0 fw-bold" style={{fontSize: "14px"}}>
                                    {product.name}
                                </span>
                                <span className="col-md-6 px-0 text-end" style={{fontSize: "14px"}}>
                                    {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} x {product.amount}
                                </span>
                            </div>
                        ))
                    }
                    <div className="row mt-2 px-3">
                        <span className="col-md-6 px-0 fw-bold" style={{fontSize: "15px"}}>
                            TOTAL
                        </span>
                        <span className="col-md-6 px-0 fw-bold text-end" style={{fontSize: "16px"}}>
                            {totalBill.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;