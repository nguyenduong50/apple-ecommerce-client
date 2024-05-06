import { Fragment } from "react";
import BannerHome from '../components/Banner/BannerHome';
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import OtherInfo from "../components/OtherInfo/OtherInfo";
import { json } from "react-router-dom";
import { API_ROOT } from "../Util/const";

const HomePage = () => {
    return (
        <Fragment>
            <BannerHome />
            <Categories />
            <Products />
            <OtherInfo />
        </Fragment>
    );
}

export default HomePage;

export async function loader(){
    const response = await fetch(API_ROOT + '/v2/product');

    if(!response.ok){
        throw json(
            {message: 'Could not fetch products'},
            {status: 500}
        )
    }
    else{
        const data = await response.json();
        return data;
    }
}