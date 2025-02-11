import { Link, useLocation, useNavigate } from "react-router-dom";

import yslogo from "../assets/yayinstocks_bg_transperent_web.png";
import { HiMiniShoppingBag } from "react-icons/hi2";
import white_stroke from "@/assets/white_stroke.png"

const Header = () => {

    const nav_links = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Course",
            link: "/course"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Contact",
            link: "/contact"
        }
    ]

    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent font-thin text-sm flex justify-between items-center px-20 py-5">
            {/* ========================================= */}
            {/* Logo Section */}
            {/* ========================================= */}
            <div>
                <img src={yslogo} className="max-w-28" alt="YayinStocks Logo" />
            </div>

            {/* ========================================= */}
            {/* Menu Section */}
            {/* ========================================= */}
            <nav className="text-white font-geist">
                <ul className="flex gap-x-10 font-light text-lg">
                    {nav_links.map((menu) => {
                        return (
                            <Link className="flex flex-col relative" to={menu.link}>
                                <li className="cursor-pointer hover:text-gray-300 transition-colors text-xl font-caveat">{menu.name}</li>
                                {
                                    pathname == menu.link && <img src={white_stroke} alt="" className="w-32 invert absolute -bottom-2" />
                                }
                            </Link>
                        )
                    })}
                </ul>
            </nav>

            {/* ========================================= */}
            {/* Authentication Button Section */}
            {/* ========================================= */}
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