import MainNavigation from '../MainNavigation/MainNavigation';
import classes from './Header.module.css';

const Header = () => {
    return(
        <header className='container'>
            <MainNavigation />
        </header>
    )
}

export default Header;