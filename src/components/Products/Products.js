import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import classes from './Products.module.css';
import Product from './Product';

import { API_ROOT } from '../../Util/const';

const Products = () => {
    const data = useLoaderData();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        let products_tempo = [];
        for(let key in data){
            products_tempo.push({
                id: key,
                name: data[key].name,
                slug: data[key].slug,
                img1: API_ROOT + '/' + data[key].images[0],
                price: parseFloat(data[key].price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
                short_desc: data[key].shortDescription
            })
        }

        setProducts(products_tempo);
    }, [data]);

    return(
        <section id={classes['top-products']} className={`container`}>
            <h5 className="row">MADE THE HARD WAY</h5>
            <h3 className="row">TOP TRENDING PRODUCTS</h3>
            <div className={`${classes["list-product"]} row`}>
                {products.map((product, index) => {
                    if(index <= 7){
                        return(
                            <Product key={index} product={product} />
                        )
                    }
                    return null;
                })}
            </div>
        </section>
    )
}

export default Products;