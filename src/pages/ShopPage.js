import { Fragment, Suspense } from "react";
import Banner from "../components/Banner/Banner";
import ProductList from "../components/Products/ProductList";
import { json, useLoaderData, Await, defer } from "react-router-dom";
import Popup from "../components/UI/Popup/Popup";
import { API_ROOT } from "../Util/const";

const ShopPage = () => {
    const {productList} = useLoaderData();

    return (
        <Fragment>
            <Banner page="SHOP" pageMap="SHOP"/>

            <Suspense fallback={<Popup><p style={{textAlign: 'center', fontSize: '25px', marginTop: "20px", padding: "50px 100px"}}>Loading ...</p></Popup>}>
                <Await resolve={productList}>
                    {(productList => <ProductList data={productList} />)}
                </Await>
            </Suspense>
        </Fragment>
    );
}

export default ShopPage;

export async function loaderProducts(){
    const response = await fetch(`${API_ROOT}/v2/product`);
    
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

export async function loader(){
    return defer({
        productList: loaderProducts()
    })
}