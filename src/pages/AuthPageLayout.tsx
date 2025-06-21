import { ReactNode } from "react";

interface AuthPageLayoutProps {
    children: ReactNode
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
    return (
        <div className="bg-zinc-950 flex flex-col justify-center md:flex-row h-screen text-white font-geist overflow-y-hidden">

            {children}

            {/* Image Section */}
            <section className="hidden w-full md:block md:w-1/2 h-64 md:h-full p-0 md:p-3 shadow-lg">
                <div className="relative w-full h-full">
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dkkawe9gq/image/upload/v1750481941/bull_wallpaper_qxqo1x.webp')] bg-no-repeat bg-cover bg-center rounded-none md:rounded-lg" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/90 rounded-none md:rounded-lg" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col  justify-center p-4">
                        <h1 className="text-3xl md:text-5xl font-dm_sans mb-2 text-center">Risk comes from not</h1>
                        <h2 className="text-xl md:text-2xl font-dm_sans text-center">knowing what you're doing</h2>
                        <p className="mt-5 text-center text-4xl font-caveat">- Warren Buffet</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AuthPageLayout
