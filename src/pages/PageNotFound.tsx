import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    // Generate mock stock data with a downward trend
    const generateStockData = () => {
        const data = [];
        let value = 100;
        for (let i = 0; i < 50; i++) {
            value = value * (0.98 + -i * 0.005);
            data.push({ value });
        }
        return data;
    };

    const stockData = generateStockData();

    return (
        <div className="bg-black h-screen font-geist relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-red-600/30 rounded-full blur-[200px] animate-pulse"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-green-600/20 rounded-full blur-[200px] animate-pulse"></div>
            </div>

            {/* Main Content */}
            <div className="relative h-screen flex flex-col justify-center items-center px-4">
                {/* Stock Chart */}
                <div className="w-full max-w- h-64 mb-8 opacity-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stockData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#EF4444"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* 404 Content */}
                <div className="text-center z-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <h1 className="text-red-500 text-8xl font-bold">404</h1>
                        <TrendingDown className="text-red-500 w-16 h-16" />
                    </div>
                    <h2 className="text-white text-2xl mb-4">Market Crash: Page Not Found</h2>
                    <p className="text-gray-400 mb-8">The asset you're looking for has been delisted from our exchange.</p>
                    
                    {/* Action Button */}
                    <Link 
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-green-500/20"
                    >
                        Return to Trading Floor
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-16 left-8 text-red-500/20 text-6xl font-mono">-25.60%</div>
                    <div className="absolute bottom-16 right-8 text-red-500/20 text-6xl font-mono">-404.00</div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;