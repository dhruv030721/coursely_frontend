import stock_candle from '@/assets/lottie/Stock candle loading.json';
import { Footer, Header, Lottie } from '@/components';
import { Discount } from '@/interfaces/discount';
import { webServices } from '@/services';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export type LayoutContextType = {
  disableLoader: () => void;
  discounts: Discount[];
};

const Layout = () => {
  const [loader, setLoader] = useState<Boolean>(true);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const disableLoader = () => {
    setLoader(false);
  };

  const fetchDiscounts = async () => {
    const discount: any = await webServices.GetDiscount();
    setDiscounts(
      discount.data.data
        .filter((item: any) => item.status === 'active')
        .map((item: any) => ({ code: item.code, text: item.offerText, percentage: item.discount }))
    );
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
      <Outlet context={{ disableLoader, discounts }} />
      <Footer />
    </div>
  );
};

export default Layout;
