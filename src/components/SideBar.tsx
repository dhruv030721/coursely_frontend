import { ReactNode } from "react";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdVideoLibrary } from "react-icons/md";
import { TbVideoPlus, TbUsersGroup } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { PiArrowBendDownLeftBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import yslogo from "@/assets/logo_icon.png";

interface SidebarOptionsType {
    name: string;
    icon: ReactNode;
    route: string; // Add a route property
}

interface SidebarSectionType {
    section: string;
    elements: Array<SidebarOptionsType>;
}

const SideBar = () => {
    const location = useLocation();

    const SidebarMenus: Array<SidebarSectionType> = [
        {
            section: "Main Section",
            elements: [
                {
                    name: "Dashboard",
                    icon: <BsSpeedometer2 />,
                    route: "dashboard",
                },
            ],
        },
        {
            section: "Course",
            elements: [
                {
                    name: "Courses",
                    icon: <MdVideoLibrary />,
                    route: "courses",
                },
                {
                    name: "Course Builder",
                    icon: <TbVideoPlus />,
                    route: "course-builder",
                },
            ],
        },
        {
            section: "User Section",
            elements: [
                {
                    name: "Users",
                    icon: <TbUsersGroup />,
                    route: "users",
                },
            ],
        },
        {
            section: "Payments",
            elements: [
                {
                    name: "Transactions",
                    icon: <GiReceiveMoney />,
                    route: "transactions",
                },
            ],
        },
    ];

    console.log(location.pathname.split('/')[2])

    return (
        <div className="w-[15%] border-r-[2px] border-zinc-700 h-full bg-zinc-950 flex flex-col drop-shadow-lg">
            {/* Company Heading Section */}
            <div className="flex items-center justify-between mx-3 mt-3">
                <div className="flex items-center justify-center">
                    <img src={yslogo} alt="" className="w-14" />
                    <h1 className="font-caveat text-xl">Yayin Stocks</h1>
                </div>
            </div>

            <div>
                {/* Sidebar Menus */}
                <div className="font-geist py-5 flex flex-col gap-y-3">
                    {SidebarMenus.map((menu) => (
                        <>
                            <h1 className="text-white text-xs mx-4 border-b border-zinc-700">
                                {menu.section.toUpperCase()}
                            </h1>
                            {menu.elements.map((option) => (
                                <Link
                                    to={option.route}
                                    key={option.name}
                                    className="flex justify-between items-center px-3"
                                >
                                    <div className="flex items-center gap-x-3 px-3 py-2">
                                        {option.icon}
                                        <h1 className="text-xs">{option.name}</h1>
                                    </div>
                                    {/* Show the arrow only if the route is active */}
                                    {location.pathname.split('/')[2] === option.route && <PiArrowBendDownLeftBold />}
                                </Link>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
