import { useNavigate } from "react-router-dom";
import yslogo from "../assets/yayinstocks_bg_transperent_web.png";
import { HiMiniShoppingBag } from "react-icons/hi2";

const Header = () => {

    const navigate = useNavigate();

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent font-thin text-sm flex justify-between items-center px-20 py-5">
            {/* logo section  */}
            <div>
                <img src={yslogo} className="max-w-28" alt="YayinStocks Logo" />
            </div>

            {/* menu section */}
            <nav className="text-white font-geist">
                <ul className="flex gap-x-10 font-light">
                    <li className="cursor-pointer hover:text-gray-300 transition-colors">Home</li>
                    <li className="cursor-pointer hover:text-gray-300 transition-colors">Course</li>
                    <li className="cursor-pointer hover:text-gray-300 transition-colors">About</li>
                    <li className="cursor-pointer hover:text-gray-300 transition-colors">Contact</li>
                </ul>
            </nav>

            {/* authentication button section */}
            <div className="text-white font-geist flex items-center gap-x-5">
                <HiMiniShoppingBag color="white" size={20} className="cursor-pointer hover:opacity-80 transition-opacity" />
                <button className="border-[0.5px] border-gray-400 font-light rounded-3xl px-5 py-2 hover:bg-white/10 transition-colors" onClick={() => { navigate('/login') }}>
                    Login
                </button>
            </div>
        </header>
    );
};

export default Header;