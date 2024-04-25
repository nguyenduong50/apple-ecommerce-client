import { Fragment } from "react";
import Banner from "../components/Banner/Banner";
import Checkout from "../components/Checkout/Checkout";

const CheckoutPage = () => {
    return (
        <Fragment>
            <Banner page="CHECKOUT" link="HOME / CART / " pageMap="CHECKOUT"/>
            <Checkout />
        </Fragment>
    );
}

export default CheckoutPage;