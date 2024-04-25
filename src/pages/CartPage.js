import { Fragment } from "react";
import Banner from "../components/Banner/Banner";
import Cart from '../components/Cart/Cart';

const CartPage = () => {
    return (
        <Fragment>
            <Banner page="CART" pageMap="CART"/>
            <Cart />
        </Fragment>
    );
}

export default CartPage;