import Lottie, { LottieComponentProps } from 'lottie-react';
import React from 'react';

interface CommonLottieProps extends Omit<LottieComponentProps, 'animationData'> {
  animationData: object;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

const CommonLottie: React.FC<CommonLottieProps> = ({
  animationData,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  style,
  ...rest
}) => (
  <div style={{ width, height, ...style }}>
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width: '100%', height: '100%' }}
      {...rest}
    />
  </div>
);

export default CommonLottie;
