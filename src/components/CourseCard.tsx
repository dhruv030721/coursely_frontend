import { Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components';

interface CourseCardProps {
    course: {
        id: number;
        title: string;
        description: string;
        image: string;
        category: string;
        level: string;
        instructor: string;
        rating: number;
        students: number;
        duration: string;
        price: number;
        featured?: boolean;
    }
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="bg-gradient-to-b from-black to-zinc-900 border-b border-r border-zinc-600 rounded-lg overflow-hidden shadow-xl transition-all duration-300">
            <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-16" />
                {course.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold bg-teal-900/50 text-teal-300 px-2 py-1 rounded">
                        {course.category}
                    </span>
                    <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {course.level}
                    </span>
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-2 ">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                <div className="flex items-center text-sm mb-3">
                    <img src="/api/placeholder/24/24" alt={course.instructor} className="w-6 h-6 rounded-full mr-2" />
                    <span className="text-gray-300">{course.instructor}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-3">
                    <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-gray-300 ml-1">{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="text-gray-400" size={14} />
                        <span className="text-gray-300 ml-1">{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="text-gray-400" size={14} />
                        <span className="text-gray-300 ml-1">{course.duration}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-400">${course.price}</span>
                    <Button btnClass="rounded-md px-6 border-b border-r bg-green-950 border-zinc-600 gap-x-1 text-white hover:scale-105 transition" handler={() => { }} name="Enroll" />
                </div>
            </div>
        </div>
    );
}

// Example usage:
// Import the component
// import CourseCard from './components/CourseCard';
//
// Then use it in your component:
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//   {filteredCourses.map(course => (
//     <CourseCard key={course.id} course={course} />
//   ))}
// </div>