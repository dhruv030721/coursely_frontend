import { Input, Button } from "@/components"
import { IoSend } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";

const Contactus = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative top-32">
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-xl lg:text-6xl">
                    Contact <span className="bg-gradient-to-r from-green-800 to-green-950 bg-clip-text text-transparent">Us</span>
                </h1>
            </div>
            <div className="relative w-full text-white flex flex-col items-center" id="ContactSection">

                <div className="flex relative top-40 z-10 rounded-3xl py-10 px-16 bg-black/60 shadow-xl border border-zinc-500 backdrop-blur-lg">
                    <div className="">
                        <h1 className="text-xl font-bold text-center mb-10">Contact Information</h1>
                        <p className="flex font-dm_sans font-light text-sm items-center gap-x-2 mb-3 text-zinc-300"><PiPhoneCallFill size={20} /> Phone : +91 1234567891</p>
                        <p className="flex font-dm_sans font-light text-sm items-center gap-x-2 text-zinc-300"><MdOutlineMail size={20} /> Email : support@yayinstocks.in</p>
                    </div>

                    <div className="h-96 border border-zinc-600 mx-10"></div>

                    <div>
                        <h1 className="text-xl font-bold text-center mb-4">Contact Our Team</h1>
                        <p className="text-center text-sm text-zinc-400 font-light mb-8 font-dm_sans">Questions, Bug Report, Feedback --- We're here for all!</p>

                        <div className="grid grid-cols-2 gap-6">
                            <Input name="Name" placeholder="Enter your name" type="text" required={true} label="Name" />
                            <Input name="Email" placeholder="Enter your email" type="email" required={true} label="Email" />
                            <Input name="Phone Number" placeholder="Enter your Phone number" type="number" required={true} label="Phone Number" />
                            <Input name="Subject" placeholder="Enter your Subject" type="text" required={true} label="Subject" />
                            <div className="col-span-2">
                                <Input name="Message" placeholder="Enter your message" type="text" required={true} label="Message" />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <Button name="Submit" btnClass="rounded-md px-6 bg-green-950 border-b-[0.5px] border-r-[0.5px] border-zinc-600 gap-x-2" handler={() => { }} posticon={<IoSend />} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Green Section */}
                <div className="w-full h-52 bg-green-950" />
            </div>
        </div>
    );
};


export default Contactus
