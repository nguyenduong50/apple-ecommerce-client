import classes from './OverLay.module.css';

const OverLay = ({children}) => {
    return(
        <div id={classes["overlay"]}>
            {children}
        </div>
    );
}

export default OverLay;