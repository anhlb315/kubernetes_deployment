import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../cookies";
import { ROUTE } from '../../routes';

export function RequireAuth({ children }) {
    const navigate = useNavigate();
    const token = cookies.get("TOKEN");

    useEffect(() => {
        if (!token) {
            navigate(ROUTE.LOGIN);
        }
    }, []);

    if (!!token) {
        return children;
    }
}