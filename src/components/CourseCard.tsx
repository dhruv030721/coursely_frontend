import { Button, MarkdownRenderer } from '@/components';
import { Course } from '@/interfaces';
import { Clock, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gradient-to-b cursor-pointer from-black to-zinc-900 border-b border-r border-zinc-600 rounded-lg overflow-hidden shadow-xl transition-all duration-300  w-full max-w-sm mx-auto sm:max-w-none"
      onClick={() => {
        navigate(`/courses/${course._id}`, { state: { course } });
      }}
    >
      <div className="relative">
        <img
          src={`${course.thumbnail}`}
          alt={course.title}
          className="w-full h-32 sm:h-36 lg:h-40 object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-12 sm:h-14 lg:h-16" />
        {course.featured && (
          <div className="absolute top-2 right-2 bg-green-950 text-white  text-xs px-2 py-1 rounded">
            FEATURED
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 text-white leading-tight">
          {course.title}
        </h3>

        {/* Description */}
        <div className="line-clamp-2 mb-2">
          <MarkdownRenderer content={course.description} />
        </div>

        {/* Stats - Responsive Layout */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm mb-3 gap-2 sm:gap-1">
          <div className="flex items-center justify-between sm:justify-start sm:gap-4">
            {/* Rating */}
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-current" size={12} />
              <span className="text-gray-300 ml-1">{course.rating || 5}</span>
            </div>

            {/* Students */}
            <div className="flex items-center">
              <Users className="text-gray-400" size={12} />
              <span className="text-gray-300 ml-1">{course.students || 100}</span>
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
          <span className="text-lg sm:text-xl font-bold text-green-400">${course.price}</span>
          <Button
            btnClass="w-full sm:w-auto rounded-md px-3 sm:px-4 lg:px-6 py-2 border-b border-r bg-green-950 border-zinc-600 gap-x-1 text-white hover:scale-105 transition text-xs sm:text-sm"
            handler={() => {
              navigate(`/courses/${course._id}`, { state: { course } });
            }}
            name="Enroll"
          />
        </div>
      </div>
    </div>
  );
}
