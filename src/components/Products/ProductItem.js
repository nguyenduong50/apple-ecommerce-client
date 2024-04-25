import { useNavigate } from 'react-router-dom';
import classes from './ProductItem.module.css';

const Product = ({product}) => {
    const navigate = useNavigate();
    const detailsPageHandler = (slug) => {
        navigate(`/details/${slug}`);
    }

    return(
        <div className={`${classes["product-item"]} col-md-4`}>
            <img className="" src={`http://localhost:5000/${product.image}`} onClick={() => detailsPageHandler(product.slug)} alt="apple" />
            <h6 className="text-center text-body-secondary fst-italic px-1 pt-3" onClick={() => detailsPageHandler(product.id)}>{product.name}</h6>
            <p className="text-center text-body-tertiary fst-italic">{product.price}</p>
        </div>
    )
}

export default Product;