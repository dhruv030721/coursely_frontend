import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store"
import { getCookie } from "@/utility/getCookie";
import UserServices from "@/services/User/UserServices";
import { login } from "@/store/slices/auth.slice";

interface AuthLayoutProps {
    children: ReactNode;
    authentication?: boolean;
}

const AuthLayout = ({ children, authentication = true }: AuthLayoutProps) => {

    const authStatus = useSelector((state: RootState) => state.auth.isLogin);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        const token = getCookie('auth_token');
    
        if (authStatus === false && token != null) {
            UserServices.verifyToken(token).then((response) => {
                if (response.status === 200) {
                    dispatch(login(response.data.data.email));
                } else {
                    setIsLoading(false);
                }
            }).catch(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        if (!isLoading && authentication && !authStatus) {
            navigate('/login');
        }
    }, [authStatus, authentication, isLoading]);
    

    if (isLoading) {
        return <div>Loading...</div>
    }


    return (<>{children}</>)
}

export default AuthLayout
