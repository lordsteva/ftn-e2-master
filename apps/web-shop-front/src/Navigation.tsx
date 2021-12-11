import React, { FC } from 'react';
import { useUser } from './state/state';
import { Navbar, ALink } from '@team21/ui-components'
import { useNavigate } from 'react-router';

const Navigation: FC = () => {
    const [{ token }, dispatch] = useUser();
    const navigate = useNavigate();

    function logout(){
        dispatch?.({ type: 'LOGOUT'})
        localStorage.removeItem('token')   
        navigate('/login');
    }

    return (
        <Navbar>
            <ALink path="/" name="Home" />
            <ALink path="/categories" name="Categories" />
            { token && <ALink path="/cart" name="Cart" /> }
            { token && <ALink path="/orders" name="Orders" /> }
            { token && <ALink onClick={logout} name="Logout" /> }
            { !token && <ALink path="/login" name="Login" /> }
            { !token && <ALink path="/register" name="Register" /> }
        </Navbar>
    )
}

export default Navigation;