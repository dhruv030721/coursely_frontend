import { Button, MarkdownRenderer } from '@/components';
import { Course } from '@/interfaces';
import { Clock, Star, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent rounded-xl shadow-sm border border-zinc-700 hover:shadow-md transition-shadow duration-200 overflow-hidden group flex flex-col h-full">
      {/* Course Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`${course.thumbnail}`}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {course.featured && (
          <div className="absolute top-2 right-2 bg-green-950 text-white text-xs px-2 py-1 rounded">
            FEATURED
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title - Fixed height for consistent spacing */}
        <div className="h-14 mb-2">
          <h3 className="font-semibold text-lg text-white line-clamp-2 leading-7">
            {course.title}
          </h3>
        </div>
        
        {/* Description - Fixed height for consistent spacing */}
        <div className="h-10 mb-4">
          <div className="text-gray-600 text-sm line-clamp-2 leading-5">
            <MarkdownRenderer content={course.description} />
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{course.rating || 5}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.students || 100}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price and Enroll Button - Pushed to bottom */}
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-green-400">${course.price}</span>
          </div>
          
          <Button
            btnClass="w-full bg-green-900 hover:bg-green-950 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
            handler={() => {
              navigate(`/courses/${course._id}`, { state: { course } });
            }}
            name={
              <div className="flex items-center justify-center gap-2 group">
                <span>Enroll Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}