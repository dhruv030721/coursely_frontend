import { Input, TextArea, Button, StepSection, MediaInput } from "@/components"
import { useState } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";



const CourseBuilder = () => {

    const [activeStepNo, setActiveStep] = useState(1);

    const steps = [
        { label: "Course Information" },
        { label: "Course Builder" },
        { label: "Publish" },
    ];

    const MediaInstruction = [
        'Aspect ratio 16:9',
        'Recommended size 1024x576'
    ]

    const nextBtnHandler = () => {
        setActiveStep((prev) => prev + 1);
    }


    return (
        <div className="w-[85%] font-geist m-5">
            <section className="flex w-full">
                <div>
                    <h1 className="text-2xl">Course Builder Section</h1>
                    <p className="text-gray-400 text-xs">Create and Manage courses easily in the Course Builder section.</p>
                </div>
            </section>

            {/* Section View */}
            <StepSection steps={steps} activeStepNo={activeStepNo} />


            {/* Step : 1 */}
            {/* Course Form Section */}
            <section className="mt-5 border-[0.5px] p-5 rounded-md border-zinc-700">
                <form action="" className="grid grid-cols-3 gap-10 w-full">
                    <Input label="Course Title" placeholder="Enter Course Title" name="course_title" type="text" required={true} />
                    <Input label="Price" placeholder="Enter Price" name="course_price" type="number" required={true} icon={<RiMoneyRupeeCircleLine className="text-zinc-400" />} />
                    <TextArea label="Course Short Description" placeholder="Enter Description" name="course_description" required={true} />
                    <TextArea label="Benefits of the course" placeholder="Enter Benefits of the course" name="course_title" required={true} />
                    <MediaInput label="Course Thumbnail" required={true} instruction={MediaInstruction} name="course_thumbnail" />
                </form>
            </section>


            {/* Button Section */}
            <section className="flex justify-end mt-5">
                <Button name="Next" btnClass="bg-green-700" handler={nextBtnHandler} icon={<MdKeyboardArrowRight size={20} />} />
            </section>
        </div>
    )
}

export default CourseBuilder
