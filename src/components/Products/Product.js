import { useSelector, useDispatch } from 'react-redux';
import { productPopupActions } from '../../store';
import Popup from '../UI/Popup/Popup';
import classes from './Product.module.css';
import ProductDetailsPopup from './ProductDetailsPopup';

const Product = ({product}) => {
    const productID = useSelector(state => state.productPopup.productID); 
    const dispatch = useDispatch();

    const showPopupHandler = (id) => {
        dispatch(productPopupActions.showPopup(id));
    }

    return(
        <div className={`${classes.product} col-md-3`}>
            <img className="" src={product.img1} onClick={() => showPopupHandler(product.id)} alt="apple" />
            <h6 className="text-center text-body-secondary fst-italic px-1 pt-3">{product.name}</h6>
            <p className="text-center text-body-tertiary fst-italic">{product.price}</p>
            {    
                productID === product.id &&        
                <Popup width={65}>
                    <ProductDetailsPopup product={product} />
                </Popup>
            }
        </div>
    )
}

export default Product;