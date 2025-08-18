import { CandleStickLoader, Footer, Header } from '@/components';
import UserServices from '@/services/User/UserServices';
import { RootState } from '@/store';
import { login } from '@/store/slices/auth.slice';
import { getToken } from '@/utility/getToken';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    const { authToken } = getToken();

    if (authToken) {
      UserServices.VerifyToken()
        .then((response: any) => {
          if (response.status === 200 || response.status === 304) {
            dispatch(login(response.data.data));
          } else {
            navigate('/login');
          }
        })
        .catch(() => {
          navigate('/login');
        })
        .finally(() => {
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
    return <CandleStickLoader />;
  }

  return (
    <div className='font-geist'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
