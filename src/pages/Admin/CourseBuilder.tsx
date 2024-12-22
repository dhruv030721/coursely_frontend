import { Input, TextArea, Button, StepSection, MediaInput, Checkbox, CustomModal, EditLesson } from "@/components"
import { useState } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useId } from "react";
import { IoCaretDown } from "react-icons/io5";


const CourseBuilder = () => {
    const id = useId();
    const [activeStepNo, setActiveStep] = useState(1);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [sectionName, setSectionName] = useState("");
    const [open, setOpen] = useState(false);
    const [sections, setSections] = useState([
        {
            id: '1',
            name: "Lesson-01",
            lessons: [
                {
                    id: '1-1',
                    lecture_title: "Introduction",
                    video_playback_time: "10:00",
                    lecture_description: "Welcome to the course",
                    lecture_video: "",
                },
                {
                    id: '1-1',
                    lecture_title: "Hello World",
                    video_playback_time: "10:00",
                    lecture_description: "Welcome to the course",
                    lecture_video: "",
                },
            ]
        }
    ]);

    const steps = [
        { label: "Course Information" },
        { label: "Course Builder" },
        { label: "Publish" },
    ];

    const MediaInstruction = [
        'Aspect ratio 16:9',
        'Recommended size 1024x576'
    ];

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const moveLesson = (sectionId: string, oldIndex: number, newIndex: number) => {
        setSections(prevSections => {
            const newSections = [...prevSections];
            const sectionIndex = newSections.findIndex(s => s.id === sectionId);
            const section = { ...newSections[sectionIndex] };
            const lessons = [...section.lessons];
            const [movedLesson] = lessons.splice(oldIndex, 1);
            lessons.splice(newIndex, 0, movedLesson);
            section.lessons = lessons;
            newSections[sectionIndex] = section;
            return newSections;
        });
    };

    const nextBtnHandler = () => {
        setActiveStep((prev) => prev + 1);
    };

    const backBtnHandler = () => {
        setActiveStep((prev) => prev - 1);
    };

    return (
        <div className="w-[85%] font-geist m-5">
            <section className="flex w-full">
                <div>
                    <h1 className="text-2xl">Course Builder Section</h1>
                    <p className="text-gray-400 text-xs">Create and Manage courses easily in the Course Builder section.</p>
                </div>
            </section>

            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}

            {/* Section View */}
            <StepSection steps={steps} activeStepNo={activeStepNo} />

            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}

            {/* Step : 1 */}
            {/* Course Form Section */}
            {activeStepNo == 1 &&
                <>
                    <section className="mt-5 border-[0.5px] p-5 rounded-md border-zinc-700">
                        <form action="" className="grid grid-cols-3 gap-10 w-full">
                            <Input label="Course Title" placeholder="Enter Course Title" name="course_title" type="text" required={true} />
                            <Input label="Price" placeholder="Enter Price" name="course_price" type="number" required={true} icon={<RiMoneyRupeeCircleLine className="text-zinc-400" />} />
                            <TextArea label="Course Short Description" placeholder="Enter Description" name="course_description" required={true} />
                            <TextArea label="Benefits of the course" placeholder="Enter Benefits of the course" name="course_title" required={true} />
                            <MediaInput label="Course Thumbnail" required={true} instruction={MediaInstruction} name="course_thumbnail" innerDivClasses="border border-dashed border-zinc-500" />
                        </form>
                    </section>


                    {/* Button Section */}
                    <section className="flex justify-end mt-5">
                        <Button name="Next" btnClass="rounded-md px-6 bg-green-950 border-b-[0.5px] border-r-[0.5px] border-zinc-600" handler={nextBtnHandler} posticon={<MdKeyboardArrowRight size={20} />} />
                    </section>
                </>}


            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}


            {/* Step : 2 */}
            {activeStepNo === 2 && (
                <section className="mt-5 flex flex-col gap-y-5 border-[0.5px] p-5 rounded-md border-zinc-700">
                    <h1 className="text-lg">Course Builder</h1>
                    <div className="bg-zinc-800 w-full md:w-1/2 border-[1px] p-5 border-zinc-700 rounded-md text-xs">
                        {sections.map((section) => (
                            <div key={section.id} className="mb-4">
                                <div className="flex justify-between w-full border-b-[0.5px] border-zinc-500 pb-2">
                                    <p className="text-sm">{section.name}</p>
                                    <div className="flex items-center gap-x-2">
                                        <button className="hover:text-blue-400 transition-colors">
                                            <FaPen size={13} />
                                        </button>
                                        <button className="hover:text-red-400 transition-colors">
                                            <MdDelete size={15} />
                                        </button>
                                        <span className="text-zinc-500">|</span>
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            className="transform transition-transform duration-200 hover:text-blue-400"
                                        >
                                            <IoCaretDown
                                                size={15}
                                                className={`transform transition-transform duration-200 ${expandedSections[section.id] ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className={`mt-2 space-y-2 transition-all duration-300 ${expandedSections[section.id]
                                    ? 'max-h-96 opacity-100'
                                    : 'max-h-0 opacity-0 overflow-hidden'
                                    }`}>
                                    {section.lessons.map((lecture, index) => (
                                        <div
                                            key={lecture.id}
                                            className="ml-2 flex border-b-[0.5px] border-zinc-500 pb-2 justify-between cursor-move"
                                            draggable="true"
                                            onDragStart={(e) => {
                                                e.dataTransfer.setData('text/plain', index.toString());
                                            }}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const oldIndex = parseInt(e.dataTransfer.getData('text/plain'));
                                                moveLesson(section.id, oldIndex, index);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-zinc-400">⋮⋮</span>
                                                <p className="text-xs">
                                                    {lecture.lecture_title || 'Untitled Lecture'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <button className="hover:text-blue-400 transition-colors" onClick={() => { setOpen(prev => !prev) }}>
                                                    <FaPen size={13} />
                                                </button>
                                                <button className="hover:text-red-400 transition-colors">
                                                    <MdDelete size={15} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Input
                        label=""
                        placeholder="Add section to build your course"
                        name="course_section"
                        type="text"
                        inputClasses="p-2"
                        value={sectionName}
                        handler={(e) => {
                            setSectionName(e.target.value);
                        }}
                    />

                    <Button
                        name="Create Section"
                        btnClass=" rounded-md px-6 border-[0.5px] border-yellow-700 gap-x-2 text-yellow-500"
                        preicon={<IoMdAddCircleOutline size={20} />}
                        handler={() => {
                            setSections((prev) => sectionName != "" ? [...prev, { id: `${id}-${prev.length + 1}`, name: sectionName, lessons: [] },] : [...prev])
                            setSectionName("");
                        }}
                    />

                    <section className="flex justify-end space-x-3">
                        <Button
                            name="Back"
                            btnClass=" rounded-md px-6 bg-zinc-900 text-white border-b-[0.5px] border-r-[0.5px] border-zinc-600"
                            handler={backBtnHandler}
                            preicon={<MdKeyboardArrowLeft size={20} />}
                        />
                        <Button
                            name="Next"
                            btnClass=" rounded-md px-6 bg-green-950 border-b-[0.5px] border-r-[0.5px] border-zinc-600"
                            handler={nextBtnHandler}
                            posticon={<MdKeyboardArrowRight size={20} />}
                        />
                    </section>
                </section>
            )
            }


            {/* ------------------------------------------------------------------------------------------------------------------------------------ */}


            {/* Step : 3 */}
            {
                activeStepNo == 3 &&
                <>
                    <section className="mt-5 border-[0.5px] p-5 rounded-md border-zinc-700">
                        <h1 className="text-lg">Publish Settings</h1>
                        <Checkbox label="Make this course public" />
                        {/* Button Section */}
                        <section className="flex justify-end mt-5 space-x-3">
                            <Button name="Back" btnClass=" rounded-md px-6 bg-zinc-900 text-white border-b-[0.5px] border-r-[0.5px] border-zinc-600 " handler={backBtnHandler} preicon={<MdKeyboardArrowLeft size={20} />} />
                            <Button name="Save as Draft" btnClass=" rounded-md px-6 bg-yellow-800 border-b-[0.5px] border-r-[0.5px] border-zinc-600" handler={nextBtnHandler} />
                            <Button name="Save and Publish" btnClass=" rounded-md px-6 bg-blue-950 border-b-[0.5px] border-r-[0.5px] border-zinc-600" handler={nextBtnHandler} />
                        </section>
                    </section>

                </>
            }



            {/* Lesson Edit model box section */}
            <CustomModal open={open} modelElement={<EditLesson handleClose={() => setOpen(prev => !prev)} />} />
        </div >
    )
}

export default CourseBuilder
