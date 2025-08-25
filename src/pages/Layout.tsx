import stock_candle from '@/assets/lottie/Stock candle loading.json';
import { Footer, Header, Lottie } from '@/components';
import { Discount } from '@/interfaces/discount';
import { webServices } from '@/services';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export type LayoutContextType = {
  disableLoader: () => void;
  discounts: String[];
  userCount: number;
};

const Layout = () => {
  const [loader, setLoader] = useState<Boolean>(true);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [userCount, setUserCount] = useState<number>(0);  

  const disableLoader = () => {
    setLoader(false);
  };

  const fetchDiscounts = async () => {
    const response: any = await webServices.HomeData();
    setDiscounts(response.data.data.discounts);
    setUserCount(response.data.data.userCount);
    disableLoader();
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  if (loader) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <Lottie animationData={stock_candle} loop autoplay />
      </div>
    );
  }

  return (
    <div className="bg-black h-screen font-geist scrollbar-custom">
      <Header />
      <Outlet context={{ disableLoader, discounts, userCount }} />
      <Footer />
    </div>
  );
};

export default Layout;
