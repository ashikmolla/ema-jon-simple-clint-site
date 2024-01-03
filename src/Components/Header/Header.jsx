import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import ActiveLine from '../ActiveLink/ActiveLine';
import { AuthContext } from '../../Provider/AutheProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {

        logOut()
            .then(() => { })
            .catch((error) => { console.error(error) });
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='navLiItem'>
                <ActiveLine to="/">Home</ActiveLine>
                <ActiveLine to="orders">Order</ActiveLine>
                {/* <ActiveLine to="orderRevio">Order Review </ActiveLine> */}
                <ActiveLine to="inventory">Management Inventory</ActiveLine>
                {user ?
                    <button onClick={handleLogOut}>Loge Out</button>
                    :
                    <ActiveLine to="login">login</ActiveLine>
                }
            </div>

        </nav>
    );
};

export default Header;