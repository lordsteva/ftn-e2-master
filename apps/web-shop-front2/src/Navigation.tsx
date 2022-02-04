import React, { FC, useState, useEffect } from 'react';
import { useUser } from './state/state';
import { Navbar, ALink } from '@team21/ui-components'
import { useNavigate } from 'react-router';

const Navigation: FC = () => {
    const [{ token }, dispatch] = useUser();
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(token);

    useEffect(() => {
        setLoggedIn(token)
    }, [token])

    function logout() {
        dispatch?.({ type: 'LOGOUT'})
        localStorage.removeItem('token')
        const tkn = localStorage.getItem('token')
        setLoggedIn(tkn)
        navigate('/login');
    }

    return (
        <Navbar>
            <ALink path="/" name="Home" />
            <ALink path="/categories" name="Categories" />
            { loggedIn && <ALink path="/cart" name="Cart" /> }
            { loggedIn && <ALink path="/orders" name="Orders" /> }
            { loggedIn && <ALink path="/subscriptions" name="Subscriptions" /> }
            { loggedIn && <ALink path="/wages" name="Wages" /> }
            { loggedIn && <ALink onClick={logout} name="Logout" /> }
            { !loggedIn && <ALink path="/login" name="Login" /> }
            { !loggedIn && <ALink path="/register" name="Register" /> }
        </Navbar>
    )
}

export default Navigation;