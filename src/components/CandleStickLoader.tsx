import stock_candle from '@/assets/lottie/Stock candle loading.json';
import { Lottie } from '@/components';

const CandleStickLoader = () => {
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <Lottie animationData={stock_candle} loop autoplay />
    </div>
  );
};

export default CandleStickLoader;
