import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface AuthLayoutProps {
    children: ReactNode;
    authentication?: boolean;
}

const AdminAuthLayout = ({ children, authentication = true }: AuthLayoutProps) => {

    const authStatus = true;
    const navigate = useNavigate();

    useEffect(() => {

        if (authentication && !authStatus) {
            navigate('/login');
        }
    }, [])


    return (<>{children}</>)
}

export default AdminAuthLayout
