import { RxCross2 } from "react-icons/rx";
import { MediaInput, Input, TextArea, Button } from "@/components"

interface EditLessonProps {
    handleClose: () => void
}

const EditLesson = ({ handleClose }: EditLessonProps) => {

    const MediaInstruction = [
        'Aspect ratio 16:9',
        'Recommended size 1024x576'
    ];


    return (
        <div>
            <div className="flex justify-center h-screen items-center font-geist">
                <div className="max-w-[35%] min-h-[75%] rounded-md bg-zinc-900">
                    <div className="bg-zinc-900 border-b-[0.5px]  border-zinc-700 rounded-t-md text-zinc-300  p-3 flex items-center justify-between pr-5">
                        <h1>Edit Lecture</h1>
                        <button onClick={handleClose}>
                            <RxCross2 size={20} />
                        </button>
                    </div>
                    <div className="m-6 flex flex-col gap-y-7 text-white">
                        <MediaInput instruction={MediaInstruction} label="Lecture Video" required={true} divClasses=" text-white" innerDivClasses="border-[0.5px] 
                        border-dashed border-zinc-500" inputClasses="border" name="lecture" />

                        <Input type="text" label="Lecture Title" required={true} name="lecture_title" placeholder="Enter Lecture Title" />

                        <div>
                            <p className="flex text-xs">Video Playback Time<p className="text-red-500">*</p></p>
                            <div className="grid grid-cols-3 gap-x-8">
                                <Input type="number" name="lecture_title" placeholder="HH" />
                                <Input type="number" name="lecture_title" placeholder="MM" />
                                <Input type="number" name="lecture_title" placeholder="SS" />
                            </div>
                        </div>

                        <TextArea label="Lecture Description" placeholder="Enter Lecture Description" name="lecture_description" required={true} />

                        <section className="flex justify-end space-x-3">
                            <Button
                                name="Cancel"
                                btnClass="px-6 rounded-md bg-red-950 text-white border-b-[0.5px] border-r-[0.5px] border-zinc-600"
                                handler={handleClose}
                            />
                            <Button
                                name="Save Edits"
                                btnClass="px-6 rounded-md bg-green-950 border-b-[0.5px] border-r-[0.5px] border-zinc-600"
                            handler={() => {}}
                            />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLesson;
