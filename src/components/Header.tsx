import yslogo from "../assets/yayinstocks_bg_transperent_web.png"
import { HiMiniShoppingBag } from "react-icons/hi2";


const header = () => {
    return (
        <div className="bg-black font-thin flex text-sm justify-between items-center px-20 py-5">
            {/* logo section  */}
            <div>
                <img src={yslogo} className="max-w-28" alt="" />
            </div>

            {/* menu section */}
            <div className="text-white font-geist">
                <ul className="flex gap-x-10 font-light">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Course</li>
                    <li className="cursor-pointer">About</li>
                    <li className="cursor-pointer">Contact</li>
                </ul>
            </div>

            {/* authentication button section */}
            <div className="text-white font-geist flex items-center gap-x-5">
                <HiMiniShoppingBag color="white" size={20} />
                <button className="border-[0.5px] border-gray-400 rounded-3xl px-5 py-2">Login</button>
            </div>

        </div>
    )
}

export default header
