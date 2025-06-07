import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    // Generate more realistic market data with ups and downs
    const generateMarketData = () => {
        const data = [];
        let value = 100;
        const volatility = 0.03; // 3% volatility
        const downwardBias = 0.001; // Slight downward bias

        for (let i = 0; i < 100; i++) {
            // Random walk with downward bias
            const change = (Math.random() - 0.5) * volatility - downwardBias;
            value = value * (1 + change);

            // Add some market crashes and spikes
            if (i === 30) value *= 0.85; // Sharp drop
            if (i === 45) value *= 1.15; // Sharp rise
            if (i === 60) value *= 0.90; // Another drop
            if (i === 75) value *= 1.10; // Recovery

            data.push({
                value,
                timestamp: i
            });
        }
        return data;
    };

    const marketData = generateMarketData();

    return (
        <div className="bg-black min-h-screen h-screen font-geist relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {/* Desktop gradients */}
                <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-red-600/30 rounded-full blur-[200px] animate-pulse hidden md:block"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-green-600/20 rounded-full blur-[200px] animate-pulse hidden md:block"></div>
                
                {/* Mobile gradients - smaller and repositioned */}
                <div className="absolute -top-1/3 -right-1/3 w-3/4 h-3/4 bg-red-600/20 rounded-full blur-[100px] animate-pulse md:hidden"></div>
                <div className="absolute -bottom-1/3 -left-1/3 w-3/4 h-3/4 bg-green-600/15 rounded-full blur-[100px] animate-pulse md:hidden"></div>
            </div>

            {/* Main Content */}
            <div className="relative h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                {/* Market Chart */}
                <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl h-32 sm:h-48 md:h-56 lg:h-64 mb-4 sm:mb-6 md:mb-8 opacity-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={marketData}>
                            <Line
                                type="basis"
                                dataKey="value"
                                stroke="#EF4444"
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={true}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 404 Content */}
                <div className="text-center z-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                    {/* 404 Header with Icon */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <h1 className="text-red-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">404</h1>
                        <TrendingDown className="text-red-500 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-2xl mb-2 sm:mb-3 md:mb-4 px-2">
                        Market Crash: Page Not Found
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-7 md:mb-8 px-4 leading-relaxed">
                        The asset you're looking for has been delisted from our exchange.
                    </p>

                    {/* Action Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-green-600 text-black text-sm sm:text-base font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/20 hover:scale-105 active:scale-95"
                    >
                        Return to Trading Floor
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {/* Desktop decorative text */}
                    <div className="absolute top-8 sm:top-12 md:top-16 left-4 sm:left-6 md:left-8 text-red-500/20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-mono hidden sm:block">
                        -25.60%
                    </div>
                    <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 right-4 sm:right-6 md:right-8 text-red-500/20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-mono hidden sm:block">
                        -404.00
                    </div>
                    
                    {/* Mobile decorative text - smaller and repositioned */}
                    <div className="absolute top-8 left-4 text-red-500/15 text-xl font-mono sm:hidden">
                        -25.6%
                    </div>
                    <div className="absolute bottom-8 right-4 text-red-500/15 text-xl font-mono sm:hidden">
                        -404
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;