import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const MainShop = ({data}) => {

    const [category, setCategory] = useState("all");
    const [listProduct, setListProduct] = useState([]);

    const changeCategoryHandler = (category) => {
        setCategory(category);
    }

    useEffect(() => {
        let products_tempo = [];

        if(category === "all"){
            for(let index in data){
                products_tempo.push({
                    id: index,
                    name: data[index].name,
                    slug: data[index].slug,
                    image: data[index].images[0],
                    price: parseFloat(data[index].price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
                })
            }
        }
        else{
            for(let index in data){
                if(data[index].category === category){
                    products_tempo.push({
                        id: index,
                        name: data[index].name,
                        slug: data[index].slug,
                        image: data[index].images[0],
                        price: parseFloat(data[index].price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}),
                    })
                }
            }
        }

        setListProduct(products_tempo);
    }, [data, category]);

    return(
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-3 px-0">
                    <h5 className="text-uppercase fst-italic">Categories</h5>
                    <div className="list-group">
                        <button type="button" className="list-group-item list-group-item-action bg-dark text-white fst-italic" aria-current="true">
                            APPLE
                        </button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("all")}>All</button>
                        <button type="button" className="list-group-item list-group-item-action bg-body-secondary text-dark fst-italic fw-bold disabled" aria-disabled="true">IPHONE & MAC</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("iphone")}>IPhone</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("ipad")}>Ipad</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("macbook")}>Macbook</button>
                        <button className="list-group-item list-group-item-action bg-body-secondary text-dark fst-italic fw-bold disabled" aria-disabled="true">WIRELESS</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("airpod")}>Airpod</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("watch")}>Watch</button>
                        <button className="list-group-item list-group-item-action bg-body-secondary text-dark fst-italic fw-bold disabled" aria-disabled="true">OTHER</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("mouse")}>Mouse</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("keyboard")}>Keyboard</button>
                        <button type="button" className="list-group-item list-group-item-action fst-italic text-body-secondary" onClick={() => changeCategoryHandler("other")}>Other</button>
                    </div>
                </div>
                <div className="col-md-9 ps-4">
                    <div className="row">
                        <div className="col-md-4">
                            <input className="form-control rounded-0" placeholder="Enter Search Here!" />
                        </div>
                        <div className="col-md-3 offset-md-5 pe-0">
                            <select className="form-select form-select-sm rounded-0" aria-label="Small select example">
                                <option defaultValue>Default Sorting</option>
                                <option value="1">Price low to hight</option>
                                <option value="2">Price hight to low</option>
                                <option value="3">Bestseller</option>
                            </select>
                        </div>
                    </div>
                    {
                        listProduct.length > 0 &&
                        <div className="row mt-3">
                            {                            
                                listProduct?.map((product, index) => (                                    
                                    <ProductItem key={index} product={product} />                                  
                                ))
                            }
                        </div>
                    }
                    {
                        listProduct.length === 0 &&
                        <p className="mt-4 fs-4">There are no products in this category</p>
                    }
                </div>
            </div>
        </div>

    )
}

export default MainShop;