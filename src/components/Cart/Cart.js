import { useDispatch, useSelector } from "react-redux";
import classes from './Cart.module.css';
import { Link, useNavigate } from "react-router-dom";
import {cartActions} from '../../store';
import { useEffect, useState } from "react";

const Cart = () => {
    const navigate = useNavigate();
    const [totalBill, setTotalBill] = useState(0);
    const cart = useSelector(state => state.cart.items);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const checkoutHandler = () => {
        navigate("/checkout");
    }

    const dispatch = useDispatch();
    const deleteProductCart = (index) => {
        const item = {index}
        dispatch(cartActions.deleteCart(item));
    }
    const updateProduct = (index, amount) => {
        const updateItem = {index, amount}
        dispatch(cartActions.updateCart(updateItem));
    }

    useEffect(() => {
        let bill_tempo = 0;

        for(let index in cart){
            if(cart[index].userId === currentUser?._id){
                bill_tempo += cart[index].totalPrice; 
            }    
        }

        setTotalBill(bill_tempo);
    }, [cart, currentUser?._id])

    return(
        <div className={`${classes.cart} container`}>
            <h4 className="fst-italic text-uppercase mt-5 mb-4 row ">shopping cart</h4>

            <div className="row d-flex justify-content-between">
                <div id={classes["table-col"]} className="col-12 col-md-8">
                    <div className="row overflow-scroll" style={{maxHeight: "320px"}}>
                        <table className="table">
                            <thead>
                                <tr className="">
                                    <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">Image</td>
                                    <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">Product</td>
                                    <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">Price</td>
                                    <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">Quantity</td>
                                    <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">Total</td>
                                    <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">Remove</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((product, index) => (
                                        product.userId === currentUser?._id &&
                                        <tr key={index} className="">
                                            <td className="text-center align-middle">
                                                <img src={`http://localhost:5000/${product.image}`} alt="product"/>
                                            </td>
                                            <td className="text-center align-middle text-wrap fst-italic">{product.name}</td>
                                            <td className="text-center align-middle text-wrap fst-italic text-body-tertiary">{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                            <td className="text-center align-middle text-wrap">
                                                <button className="border-0 bg-white mx-1" onClick={() => updateProduct(index, -1)}>
                                                    <i className="fa-solid fa-caret-left"></i>
                                                </button>
                                                {product.amount}
                                                <button className="border-0 bg-white mx-1" onClick={() => updateProduct(index, 1)}>
                                                    <i className="fa-solid fa-caret-right"></i>
                                                </button>
                                            </td>
                                            <td className="text-center align-middle text-wrap fst-italic text-body-tertiary">{product.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                            <td className="text-center align-middle">
                                                <button className="border-0 bg-white" onClick={() => deleteProductCart(index)}>
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0 px-5 py-5 bg-body-tertiary fst-italic text-secondary" id={classes["col-cart-total"]}>
                    <h4 className="mb-4">CART TOTAL</h4>
                    <div className="row d-flex justify-content-between border-bottom border-dark-subtle pb-2">
                        <span className="col-lg-6 fw-bold">SUBTOTAL</span>
                        <span className="col-lg-6 text-end" style={{fontSize: "14px"}}>{totalBill.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </div>
                    <div className="row d-flex justify-content-between mt-2">
                        <span className="col-lg-6 fw-bold">TOTAL</span>
                        <span className="col-lg-6 text-end" style={{fontSize: "14px"}}>{totalBill.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </div>
                    <div className="row mt-4">
                        <input type="text" className="form-control rounded-0" placeholder="Enter your coupon"/>
                        <button className="btn btn-dark rounded-0">
                            <i className="fa-solid fa-gift me-2"></i>
                            <span>Apply coupon</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col-md-8 py-4 bg-body-tertiary">
                    <Link to="/shop" className="col-12 col-lg-3 ms-3 fst-italic text-body-secondary">
                        <i className="fa-solid fa-arrow-left me-2"></i>
                        <span>Continue shopping</span>
                    </Link>
                    <button className="col-12 col-lg-3 offset-0 offset-lg-6 border-1 bg-transparent fst-italic text-body-secondary py-2" onClick={checkoutHandler}>                           
                        <span className="">Proceed to checkout</span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;