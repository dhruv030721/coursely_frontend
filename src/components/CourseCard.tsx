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
        <div className="bg-gradient-to-b from-black to-zinc-900 border-b border-r border-zinc-600 rounded-lg overflow-hidden shadow-xl transition-all duration-300  w-full max-w-sm mx-auto sm:max-w-none">
            <div className="relative">
                <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-32 sm:h-36 lg:h-40 object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-12 sm:h-14 lg:h-16" />
                {course.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                    </div>
                )}
            </div>
            
            <div className="p-3 sm:p-4">
                {/* Category and Level Tags */}
                <div className="flex justify-between items-center mb-2 sm:mb-3 gap-2">
                    <span className="text-xs font-semibold bg-teal-900/50 text-teal-300 px-2 py-1 rounded flex-shrink-0">
                        {course.category}
                    </span>
                    <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded flex-shrink-0">
                        {course.level}
                    </span>
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 text-white leading-tight">
                    {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                    {course.description}
                </p>
                
                {/* Instructor */}
                <div className="flex items-center text-xs sm:text-sm mb-2 sm:mb-3">
                    <img 
                        src="/api/placeholder/24/24" 
                        alt={course.instructor} 
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-2 flex-shrink-0" 
                    />
                    <span className="text-gray-300 truncate">{course.instructor}</span>
                </div>
                
                {/* Stats - Responsive Layout */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm mb-3 gap-2 sm:gap-1">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                        {/* Rating */}
                        <div className="flex items-center">
                            <Star className="text-yellow-400 fill-current" size={12} />
                            <span className="text-gray-300 ml-1">{course.rating}</span>
                        </div>
                        
                        {/* Students */}
                        <div className="flex items-center">
                            <Users className="text-gray-400" size={12} />
                            <span className="text-gray-300 ml-1">{course.students.toLocaleString()}</span>
                        </div>
                        
                        {/* Duration */}
                        <div className="flex items-center">
                            <Clock className="text-gray-400" size={12} />
                            <span className="text-gray-300 ml-1">{course.duration}</span>
                        </div>
                    </div>
                </div>
                
                {/* Price and Enroll Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <span className="text-lg sm:text-xl font-bold text-green-400">
                        ${course.price}
                    </span>
                    <Button 
                        btnClass="w-full sm:w-auto rounded-md px-3 sm:px-4 lg:px-6 py-2 border-b border-r bg-green-950 border-zinc-600 gap-x-1 text-white hover:scale-105 transition text-xs sm:text-sm" 
                        handler={() => { }} 
                        name="Enroll" 
                    />
                </div>
            </div>
        </div>
    );
}

// Example responsive usage:
// Import the component
// import CourseCard from './components/CourseCard';
//
// Then use it in your component with responsive grid:
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
//   {filteredCourses.map(course => (
//     <CourseCard key={course.id} course={course} />
//   ))}
// </div>