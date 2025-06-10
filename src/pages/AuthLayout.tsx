import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store"


interface AuthLayoutProps {
    children: ReactNode;
    authentication?: boolean;
}

const AuthLayout = ({ children, authentication = true }: AuthLayoutProps) => {

    const authStatus = useSelector((state: RootState) => state.auth.isLogin);
    const navigate = useNavigate();

    useEffect(() => {

        if (authentication && !authStatus) {            
            navigate('/login');
        }

    }, [authStatus, authentication])


    return (<>{children}</>)
}

export default AuthLayout
