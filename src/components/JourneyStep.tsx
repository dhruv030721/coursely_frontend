import type { ReactNode } from "react"

interface JourneyStepProps {
    icon: ReactNode
    title: string
    content: string
}

export default function JourneyStep({ icon, title, content }: JourneyStepProps) {
    return (
        <div className="flex gap-6">
            <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    {icon}
                </div>
            </div>
            <div>
                <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
                <p className="text-gray-300">{content}</p>
            </div>
        </div>
    )
}
