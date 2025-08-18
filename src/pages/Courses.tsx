import { CandleStickLoader, CourseCard } from '@/components';
import { Course } from '@/interfaces';
import { CourseStatus } from '@/interfaces/course';
import { webServices } from '@/services';
import { RootState } from '@/store';
import { setCourses } from '@/store/slices/course.slice';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PiGraduationCapFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';

export default function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.course.courses);
  const [loader, setLoader] = useState<Boolean>(true);

  useEffect(() => {
    if (courses.length === 0) {
      (async () => {
        const response: any = await webServices.GetCourses();
        dispatch(setCourses(response.data.data));
        setLoader(false);
      })();
    } else {
      setLoader(false);
    }
  }, [courses]);

  const featuredCourses = courses.filter(
    (course: Course) => course.featured && course.status == CourseStatus.PUBLISHED
  );

  const allPublishedCourses = courses.filter(
    (course: Course) => course.status == CourseStatus.PUBLISHED
  );

  if (loader) {
    return <CandleStickLoader />;
  }

  return (
    <div id="CoursesSection" className="relative min-h-screen bg-black text-gray-100 pt-20">
      <section className="bg-gradient-to-t from-black via-green-950/50 to-black py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Invest in Your <span className="text-green-400">Financial Future</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Our expert-led stock market courses give you the knowledge and skills to trade with
            confidence and build wealth for the long term.
          </p>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex justify-center md:justify-start items-center">
            <Star className="text-yellow-400 mr-2" size={24} />
            Featured Courses
          </h2>
          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course: Course, idx: number) => (
                <CourseCard key={course._id ?? `featured-course-${idx}`} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No featured courses available!</p>
            </div>
          )}
        </div>
      </section>

      {/* Courses */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex justify-center md:justify-start items-center">
            <PiGraduationCapFill className="text-yellow-400 mr-2" size={24} />
            All Courses
          </h2>
          {allPublishedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPublishedCourses.map((course: Course, idx: number) => (
                <CourseCard key={course._id ?? `all-course-${idx}`} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No courses found!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
