import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface AuthLayoutProps {
    children: ReactNode;
    authentication?: boolean;
}

const AuthLayout = ({ children, authentication = true }: AuthLayoutProps) => {

    const authStatus = true;
    const navigate = useNavigate();

    useEffect(() => {

        if (authentication && !authStatus) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [authStatus, authentication, navigate])


    return (<>{children}</>)
}

export default AuthLayout
