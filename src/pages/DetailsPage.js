import { Fragment, Suspense } from "react";
import DetailsProduct from "../components/Products/DetailsProduct";
import { Await, defer, useLoaderData, json } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import ProductRelatedList from '../components/Products/ProductRelatedList';
import { API_ROOT } from "../Util/const";

const DetailsPage = () => {
    const {data} = useLoaderData();

    return (
        <Fragment>
            <Banner page="PRODUCT" pageMap="PRODUCT"/>

            <Suspense fallback={<p style={{textAlign: 'center', fontSize: '22px', marginTop: "25px"}}>Loading ...</p>}>
                <Await resolve={data.product}>
                    {(productDetail => <DetailsProduct product={productDetail}/>)}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{textAlign: 'center', fontSize: '22px', marginTop: "25px"}}>Loading ...</p>}>
                <Await resolve={data.productRelated}>
                    {(productRelated => <ProductRelatedList productRelated={productRelated}/>)}
                </Await>
            </Suspense>
        </Fragment>
    );
}

export default DetailsPage;

async function loadProduct(slug){
    const response = await fetch(API_ROOT + '/v2/product/' + slug);
    
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

export async function loader({params}){
    const slug = params.slug;

    return defer({
        data: await loadProduct(slug),
    })
}