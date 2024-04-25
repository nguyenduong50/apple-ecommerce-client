import { useNavigate } from 'react-router-dom';
import classes from './Categories.module.css';
import { list_product} from '../../assets';
import Category from './Category';

const Categories = () => {
    const navigate = useNavigate();
    const shopPageHandler = () => {
        navigate('shop');
        document.documentElement.scrollTop = 0;
    }

    return(
        <section className="container" id={classes.categories}>
            <h5 className="text-center">CAREFULLY CREATED COLLECTIONS</h5>
            <h3 className="text-center">BROWSE OUR CATEGORIES</h3>
            <div className={`${classes["first-line"]} row d-flex justify-content-between mb-4`}>
                {
                    list_product.map((product, index) => {
                        if(index < 2){
                            return(
                                <Category key={index} product={product} onShop={shopPageHandler} />
                            )
                        }
                        return null;
                })}
            </div>
            <div className={`${classes["second-line"]} row d-flex justify-content-between`}>
                {
                    list_product.map((product, index) => {
                        if(index >= 2){
                            return(
                                <Category key={index} product={product} onShop={shopPageHandler} />
                            )
                        }
                        return null;
                    })
                }
            </div>
        </section>
    )
}

export default Categories;