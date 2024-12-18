import { FaCheck } from "react-icons/fa6";
import React from "react";

interface StepSectionProps {
    steps: { label: string }[]; // Array of step labels
    activeStepNo: number; // Current active step number
}

const StepSection: React.FC<StepSectionProps> = ({ steps, activeStepNo }) => {
    const activeStep = "border-dashed border-red-700 animate-bounce";
    const completedStep = "border-solid border-green-700 bg-green-700";
    const inActiveStep = "border-dashed border-red-700";

    return (
        <section className="flex justify-center items-center mt-5">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="h-20 relative text-center flex flex-col justify-center items-center space-y-2">
                        <h1
                            className={`${activeStepNo === index + 1 ? activeStep : ""} 
              ${activeStepNo > index + 1 ? completedStep : inActiveStep} 
              border-2 rounded-full w-8 h-8 flex items-center justify-center`}
                        >
                            {activeStepNo > index + 1 ? <FaCheck /> : index + 1}
                        </h1>
                        <span className="text-[12px] font-extralight w-32 absolute bottom-0">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                        <span
                            className={`${activeStepNo > index + 1 ? "text-green-700" : "text-red-700"
                                } text-sm`}
                        >
                            --------------------
                        </span>
                    )}
                </React.Fragment>
            ))}
        </section>
    );
};

export default StepSection;
