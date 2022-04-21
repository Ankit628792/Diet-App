import { removeUser, setUser } from './action/user.action';
import store from './store';
import jwt_decode from 'jwt-decode'

export const checkAuth = (navigate) => {
    if (localStorage.jwtToken) {
        try {
            const token = localStorage.jwtToken;
            const decoded = jwt_decode(token);
            store.dispatch(setUser(decoded));

            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp < currentTime) {
                store.dispatch(removeUser());
            }
        } catch (error) {
            if (['/login', '/register'].includes(window.location.pathname) === false)
                navigate('/login')
        }
    }
    else {
        if (['/login', '/register'].includes(window.location.pathname) === false)
            navigate('/login')
    }
}