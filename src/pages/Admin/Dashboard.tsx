import { FiSettings } from "react-icons/fi"
import { AiOutlineStock } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";



const Dashboard = () => {

    const MostPurchaedCourse = [
        {
            title: "Introduction to Trading",
            img: "https://th.bing.com/th/id/OIP.xNz_Q8NqgfBrM_EfLxbU3AHaE7?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            total_purchase: "5000"
        },
        {
            title: "Introduction to Stock Market",
            img: "https://i.ytimg.com/vi/YBJWGuzDRxo/maxresdefault.jpg",
            total_purchase: "3000"
        }
    ]


    return (
        <div className="w-[85%] m-5 flex flex-col font-geist">

            <section className="flex justify-between w-full">
                <div>
                    <h1 className="text-2xl flex items-center gap-x-2">
                        Welcome Back, Admin <AiOutlineStock />
                    </h1>
                    <p className="text-sm text-gray-400">
                        Manage your courses, users, analytics and other settings efficiently.
                    </p>
                </div>

                <div className="flex items-center h-10 gap-x-5">
                    <FiSettings size={20} />
                    <img
                        src="https://th.bing.com/th/id/R.7b528d6309ee84dc0d8fbffef7cc9347?rik=2yRGcUoANndcJQ&riu=http%3a%2f%2fclipart-library.com%2fimages%2fpT7K76y8c.jpg&ehk=DzUoQ28TD73H6PKsFR8wgmg6uljiKEGEuc1oN0pKQj0%3d&risl=&pid=ImgRaw&r=0"
                        alt=""
                        className="h-8 w-8 object-cover rounded-full"
                    />
                </div>
            </section>

            <div className="w-full h-[0.5px] mt-5 bg-zinc-700"></div>

            {/* Metrics Section */}
            <section className="mt-5 flex justify-around">

                {/* User Metrics  */}
                <div className="flex flex-col gap-y-3">
                    <h1 className="flex items-center gap-x-2"><FiUser /> User Metrics</h1>
                    <div className="flex space-x-5">
                        <div className="border border-zinc-700 p-5 flex flex-col space-y-1 rounded-md">
                            <h1 className="text-2xl">10</h1>
                            <p className="text-zinc-400 text-sm">Today New Users</p>
                        </div>
                        <div className="border border-zinc-700 p-5 flex flex-col space-y-1 rounded-md">
                            <h1 className="text-2xl">50</h1>
                            <p className="text-zinc-400 text-sm">Active Users</p>
                        </div>
                        <div className="border border-zinc-700 p-5 flex flex-col space-y-1 rounded-md">
                            <h1 className="text-2xl">500</h1>
                            <p className="text-zinc-400 text-sm">Last Month New User</p>
                        </div>
                    </div>
                </div>

                <div className="h-full w-[0.5px] bg-zinc-700"></div>

                {/* Revenue Metrics */}
                <div className="flex flex-col gap-y-3">
                    <h1 className="flex items-center gap-x-2"><GiMoneyStack /> Revenue Metrics</h1>
                    <div className="flex space-x-5">
                        <div className="border border-zinc-700 p-5 flex flex-col space-y-1 rounded-md">
                            <h1 className="text-2xl">&#8377;20,000</h1>
                            <p className="text-zinc-400 text-sm">Today Earning</p>
                        </div>
                        <div className="border border-zinc-700 p-5 flex flex-col space-y-1 rounded-md">
                            <h1 className="text-2xl">&#8377;2,00,000</h1>
                            <p className="text-zinc-400 text-sm">Monthly Revenue</p>
                        </div>
                        <div className="border border-zinc-700 p-5 flex flex-col space-y-1 rounded-md">
                            <h1 className="text-2xl">&#8377;5,00,000</h1>
                            <p className="text-zinc-400 text-sm">Last Month Revenue</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full h-[0.5px] mt-8 bg-zinc-700"></div>

            <section className="mt-5">

                {/* Most Purchased Section */}
                <div className="w-[35%] pl-3">
                    <h1 className="flex border-b pb-3 border-zinc-700  items-center gap-x-2"><FaBook /> Most Purchesd Courses</h1>
                    <div className=" flex flex-col px-5 py-2 h-80 overflow-y-scroll overflow-x-hidden scrollbar-custom  mt-3 rounded-md space-y-5 ">
                        {MostPurchaedCourse.map((course) => (
                            <div className=" border rounded-md  border-zinc-700 p-3 flex justify-between hover:scale-105 hover:transition-all transition-all">
                                <img src={course.img} alt="" className="w-24 h-14 rounded-md" />
                                <div className="flex flex-col justify-between items-end">
                                    <h3 className="text-sm">Title : {course.title}</h3>
                                    <p className="text-xs">Total Purchase : {course.total_purchase}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
