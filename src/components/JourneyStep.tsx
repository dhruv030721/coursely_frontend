import type { ReactNode } from "react"

interface JourneyStepProps {
    icon: ReactNode
    title: string
    content: string
}

export default function JourneyStep({ icon, title, content }: JourneyStepProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 self-center sm:self-start">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    {icon}
                </div>
            </div>
            <div className="text-center sm:text-left">
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-white">{title}</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{content}</p>
            </div>
        </div>
    )
}