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
  reviews?: review[];
};

export type review = {
  userId: userId;
  message: string;
  rating: number;
  courseId: courseId;
};

export type userId = {
  name: string;
}

export type courseId = {
  title: string;
}

const Layout = () => {
  const [loader, setLoader] = useState<Boolean>(true);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [reviews, setReviews] = useState<review[]>([]);

  const disableLoader = () => {
    setLoader(false);
  };

  const fetchDiscounts = async () => {
    const response: any = await webServices.HomeData();
    setDiscounts(response.data.data.discounts);
    setUserCount(response.data.data.userCount);
    setReviews(response.data.data.reviews);
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
      <Outlet context={{ disableLoader, discounts, userCount, reviews }} />
      <Footer />
    </div>
  );
};

export default Layout;
