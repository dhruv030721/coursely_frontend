import { Button } from "@/components";
import { FaPen } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi2";
import { MdDiscount } from "react-icons/md";

interface CoupenProps {
    coupen_code: string,
    discount: number,
    status: boolean
}


const CoupenDiscount = () => {

    const CoupenData: CoupenProps[] = [
        {
            coupen_code: "20OFF",
            discount: 20,
            status: true
        },
        {
            coupen_code: "20OFF",
            discount: 20,
            status: true
        },
        {
            coupen_code: "20OFF",
            discount: 20,
            status: false
        },
        {
            coupen_code: "20OFF",
            discount: 20,
            status: true
        },
        {
            coupen_code: "20OFF",
            discount: 20,
            status: false
        },
        {
            coupen_code: "20OFF",
            discount: 20,
            status: true
        },
    ]


    return (
        <div className="w-[85%] m-5 font-geist">
            {/* Headline Section */}
            <section className="flex w-full items-center justify-between">
                <div>
                    <h1 className="text-2xl">Coupen Discount Management</h1>
                    <p className="text-gray-400 text-xs">Simplify the process of creating, tracking, and managing discounts with ease in the Coupon Discount Management section.</p>
                </div>
                <Button name="Add Coupen" handler={() => { }} btnClass="rounded-md px-6 border-b border-r border-zinc-400 gap-x-1 bg-yellow-800 text-white " preicon={<MdDiscount
                    size={15} />} />
            </section>


            {/* Coupen Table Section */}
            <div className="text-xs border mt-10 border-zinc-700 rounded-md">
                <table className="w-full" cellPadding={15}>
                    <thead className="">
                        <tr className="border-b bg-zinc-900  border-zinc-700">
                            <td className="rounded-ss-md">INDEX</td>
                            <td>COUPEN CODE</td>
                            <td>START DATE</td>
                            <td>END DATE</td>
                            <td>DISCOUNT (%)</td>
                            <td>STATUS</td>
                            <td className="rounded-se-md">ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {CoupenData.map((coupen: CoupenProps, index: number) => {
                            return <tr className="border-t border-zinc-700">
                                <td className="">
                                    {index+1}
                                </td>
                                <td className="">
                                    {coupen.coupen_code}
                                </td>
                                <td>22/07/2024</td>
                                <td>25/07/2024</td>
                                <td>{coupen.discount}%</td>
                                <td>{coupen.status ? <><h1 className="text-green-700">Active</h1></> : <><h1 className="text-red-700">Inactive</h1></>}</td>
                                <td>
                                    <div className="flex  gap-x-4 items-center">
                                        <div className="flex text-xs flex-col justify-center items-center space-y-2 cursor-pointer">
                                            <FaPen size={17} />
                                            {/* <span>Edit</span> */}
                                        </div>
                                        <div className="flex text-xs flex-col justify-center items-center space-y-2 cursor-pointer">
                                            <HiTrash size={20} />
                                            {/* <span>Delete</span> */}
                                        </div>
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

export default CoupenDiscount;
