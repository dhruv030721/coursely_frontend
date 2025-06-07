import { Link, useLocation, useNavigate } from "react-router-dom";
import yslogo from "../assets/yayinstocks_bg_transperent_web.png";
import { HiMiniShoppingBag } from "react-icons/hi2";
import white_stroke from "@/assets/white_stroke.png"
import { useState, useEffect } from "react";
import { FiUser, FiMenu, FiX } from "react-icons/fi";

const Header = () => {
    const [scrollY, setScrollY] = useState(0)
    const [isLogin, setIsLogin] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    const goToSection = (sectionId: string, time: number) => {
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, time);
    }

    const handleMobileNavClick = (link: string, viewId: string) => {
        setIsMobileMenuOpen(false)
        navigate(link)
        goToSection(viewId, 100)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const nav_links = [
        {
            name: "Home",
            link: "/",
            viewId: "HomeSection"
        },
        {
            name: "Courses",
            link: "/courses",
            viewId: "CoursesSection"
        },
        {
            name: "About",
            link: "/about",
            viewId: "AboutSection"
        },
        {
            name: "Contact",
            link: "/contact",
            viewId: "ContactSection"
        }
    ]

    const { pathname } = useLocation();

    return (
        <>
            <header className={`${isMobileMenuOpen ? 'hidden': 'fixed'} left-0 right-0 z-50 h-14 md:h-auto bg-transparent font-thin text-sm flex justify-between items-center px-4 sm:px-8 lg:px-20 bg-white rounded-b-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 border-b border-zinc-700 transition-all shadow-md ${scrollY > 0 ? "m-2 sm:m-3 border rounded-3xl" : "translate-y-0"}`}>
                {/* Logo Section */}
                <div>
                    <Link to="/">
                        <img src={yslogo} className="max-w-20 sm:max-w-24 lg:max-w-28" alt="YayinStocks Logo" />
                    </Link>
                </div>

                {/* Desktop Menu Section */}
                <nav className="text-white font-geist hidden lg:block">
                    <ul className="flex gap-x-10 font-light text-lg">
                        {nav_links.map((menu) => {
                            return (
                                <Link
                                    key={menu.link}
                                    className="flex flex-col relative"
                                    to={menu.link}
                                    onClick={() => { goToSection(menu.viewId, 100) }}
                                >
                                    <li className="cursor-pointer hover:text-gray-300 transition-colors text-xl font-caveat">{menu.name}</li>
                                    {
                                        pathname == menu.link && <img src={white_stroke} alt="" className="w-32 invert absolute -bottom-2" />
                                    }
                                </Link>
                            )
                        })}
                    </ul>
                </nav>

                {/* Desktop Auth & Cart Section */}
                <div className="text-white font-geist hidden lg:flex items-center gap-x-5">
                    <Link to="/cart">
                        <HiMiniShoppingBag color="white" size={20} className="cursor-pointer hover:opacity-80 transition-opacity" />
                    </Link>
                    {
                        isLogin ?
                            <Link to="/profile">
                                <FiUser size={25} className="hover:scale-110 transition-all" />
                            </Link> :
                            <button className="border-[0.5px] border-gray-400 font-light rounded-3xl px-5 py-2 hover:bg-white/10 transition-colors" onClick={() => { navigate('/login') }}>
                                Login
                            </button>
                    }
                </div>

                {/* Mobile Menu Button & Cart */}
                <div className="lg:hidden flex items-center gap-x-3">
                    <Link to="/cart">
                        <HiMiniShoppingBag color="white" size={18} className="cursor-pointer hover:opacity-80 transition-opacity" />
                    </Link>
                    <button
                        className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-[85vw] border border-zinc-800 rounded-l-3xl bg-black/20 backdrop-blur-lg z-[60] transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex justify-between items-center p-6  border-zinc-700">
                        <img src={yslogo} className="max-w-20" alt="YayinStocks Logo" />
                        <button
                            onClick={closeMobileMenu}
                            className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
                            aria-label="Close mobile menu"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 py-8">
                        <ul className="space-y-6 flex flex-col items-center">
                            {nav_links.map((menu) => {
                                return (
                                    <li key={menu.link}>
                                        <button
                                            className={`block w-full text-left text-zinc-300 text-lg  font-dm_sans hover:text-gray-300 transition-colors py-2 ${pathname === menu.link ? 'text-gray-300' : ''}`}
                                            onClick={() => handleMobileNavClick(menu.link, menu.viewId)}
                                        >
                                            {menu.name}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Auth Section */}
                    <div className="px-6 py-6 flex justify-center border-t border-zinc-800">
                        {
                            isLogin ?
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 text-zinc-300 text-lg font-dm_sans hover:text-gray-300 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    <FiUser size={20} />
                                    Profile
                                </Link> :
                                <button
                                    className="w-full border-[0.5px] border-gray-400 text-white font-light rounded-3xl px-5 py-3 hover:bg-white/10 transition-colors text-lg"
                                    onClick={() => {
                                        closeMobileMenu()
                                        navigate('/login')
                                    }}
                                >
                                    Login
                                </button>
                        }
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}
        </>
    );
};

export default Header;