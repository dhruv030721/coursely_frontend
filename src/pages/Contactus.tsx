import { Input } from "@/components"

const Contactus = () => {
    return (
        <div className="text-white flex flex-col justify-center items-center">
            {/* ========================================= */}
            {/* Get in touch */}
            {/* ========================================= */}
            <div>
                <h1 className="text-3xl font-bold text-center mt-10">Contact Us</h1>
                <p className="text-center mt-4">We would love to hear from you!</p>
            </div>
            {/* ========================================= */}
            {/* Form Container */}
            {/* ========================================= */}
            <div className="grid grid-cols-2 gap-4 w-1/2 border rounded-md p-4">
                <Input name="Name" placeholder="Enter your name" type="text" required={true} label="Name" />
                <Input name="Email" placeholder="Enter your email" type="emaill" required={true} label="Email" />
                <Input name="Phone Number" placeholder="Enter your Phone number" type="number" required={true} label="Phone Number" />
                <Input name="Subject" placeholder="Enter your Subject" type="text" required={true} label="Subject" />
                <Input name="Message" placeholder="Enter your message" type="text" required={true} label="Message" />
            </div>
        </div>
    )
}

export default Contactus
