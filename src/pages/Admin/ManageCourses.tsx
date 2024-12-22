import { Button } from "@/components"
import { FaPen } from "react-icons/fa6";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface CoursesProps {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    duration: string,
    price: number,
    image: string,
    status: string
}




const ManageCourses = () => {

    const navigate = useNavigate();

    const newBtnHandler = () => {
        navigate('/admin/course-builder');
    }

    const Courses: CoursesProps[] = [
        {
            id: 1,
            title: "Introduction to Trading",
            description: "This course provides in depth explaination of buying and selling trade with hands-on experience",
            duration: "20h 10m",
            createdAt: "April 20, 2024",
            price: 5200,
            image: "https://th.bing.com/th/id/OIP.xNz_Q8NqgfBrM_EfLxbU3AHaE7?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            status: "PUBLISHED"
        },
        {
            id: 1,
            title: "Introduction to Stock Market",
            description: "This course provides in depth explaination of buying and selling trade with hands-on experience",
            duration: "20h 10m",
            createdAt: "April 20, 2024",
            price: 10000,
            image: "https://i.ytimg.com/vi/YBJWGuzDRxo/maxresdefault.jpg",
            status: "DRAFT"
        }
    ]


    return (
        <div className="w-[85%] font-geist m-5 flex flex-col gap-y-10">
            {/* Headline Section */}
            <section className="flex w-full items-center justify-between">
                <div>
                    <h1 className="text-2xl">Manage Courses Section</h1>
                    <p className="text-gray-400 text-xs">Effortlessly update, organize, and oversee all your courses in the Manage Courses section.</p>
                </div>
                <Button name="New" handler={newBtnHandler} btnClass="rounded-md px-6 border-b border-r border-zinc-400 gap-x-1 bg-yellow-800 text-white " preicon={<MdOutlineAddCircleOutline size={15} />} />
            </section>



            {/* Manage Course Section */}
            <div className="text-xs border border-zinc-700 rounded-md">
                <table className="w-full" cellPadding={20}>
                    <thead className="">
                        <tr className="border-b border-zinc-700">
                            <td>COURSES</td>
                            <td>DURATION</td>
                            <td>PRICE</td>
                            <td>ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {Courses.map((course: CoursesProps) => {
                            return <tr>
                                <td className="flex gap-x-7">
                                    <img src={course.image} alt="" className="w-64 rounded-md object-cover"></img>
                                    <div className="text-lg flex flex-col gap-y-3">
                                        <h1>{course.title}</h1>
                                        <p className="text-sm w-[90%] text-zinc-500">{course.description}</p>
                                        <p className="text-sm ">Created : {course.createdAt}</p>
                                        <Button name={course.status == "PUBLISHED" ? "Published" : "Drafted"} btnClass={`rounded-full border-2 border-zinc-800 px-2 bg-zinc-900 font-semibold gap-x-1 text-xs py-1 ${course.status == "DRAFT" ? "text-yellow-700" : "text-green-700"}`} preicon={<IoIosCheckmarkCircle size={20} />} handler={newBtnHandler} />
                                    </div>
                                </td>
                                <td>{course.duration}</td>
                                <td>&#x20b9;{course.price}</td>
                                <td>
                                    <div className="flex gap-x-4 items-center">
                                        <FaPen size={17} />
                                        <HiTrash size={23} />
                                    </div>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ManageCourses
