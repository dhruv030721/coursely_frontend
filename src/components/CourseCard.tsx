
interface CourseCardProps {
    title: string;
    thumbnail: string;
}

const CourseCard = ({ title, thumbnail }: CourseCardProps) => {
    return (
        <div className="w-80 cursor-pointer rounded-3xl overflow-hidden shadow-xl border border-zinc-600 bg-gradient-to-t from-black to-zinc-600 hover:scale-105 transition duration-300 ease-in-out">
            <img
                className="w-full h-44 object-cover"
                src={thumbnail}
                alt="Course Thumbnail"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 h-20 text-start">{title}</div>
                <div className="text-start flex justify-between items-center text-sm text-zinc-400">
                    <span className="font-bold text-green-500 text-lg">&#x20b9;10000</span>
                    <span className="bg-green-900 text-white px-3 py-2 rounded-lg font-semibold">50% OFF</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;