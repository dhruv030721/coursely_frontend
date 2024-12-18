import { FiSettings } from "react-icons/fi"

const Dashboard = () => {
    return (
        <div className="w-[85%] m-5 flex font-geist">
            
            <section className="flex justify-between w-full">
                <div>
                    <h1 className="text-2xl">
                        Welcome Back, Admin
                    </h1>
                    <p className="text-sm text-gray-400">
                        Manage your courses, users, analytics and other settings efficiently.
                    </p>
                </div>

                <div className="flex items-center h-10 gap-x-5">
                    <FiSettings size={20} />
                    <img
                        src="https://th.bing.com/th/id/R.7b528d6309ee84dc0d8fbffef7cc9347?rik=2yRGcUoANndcJQ&riu=http%3a%2f%2fclipart-library.com%2fimages%2fpT7K76y8c.jpg&ehk=DzUoQ28TD73H6PKsFR8wgmg6uljiKEGEuc1oN0pKQj0%3d&risl=&pid=ImgRaw&r=0"
                        alt=""
                        className="h-8 w-8 object-cover rounded-full"
                    />
                </div>
            </section>
        </div>
    )
}

export default Dashboard
