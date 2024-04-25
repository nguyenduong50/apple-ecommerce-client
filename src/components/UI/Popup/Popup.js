import classes from './Popup.module.css';
import OverLay from './OverLay';

const Popup = ({width, children}) => {
    return(
        <OverLay>
            <div id={classes["popup"]} style={{width: `${width}%`}}>
                {children}
            </div>
        </OverLay>
    )
}

export default Popup;