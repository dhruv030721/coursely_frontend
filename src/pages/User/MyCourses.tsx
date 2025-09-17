import { CandleStickLoader } from '@/components';
import { userServices } from '@/services';
import { RootState } from '@/store';
import { Award, BookOpen, ChevronRight, Clock, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Course {
  title: string;
  thumbnail: string;
  description: string;
  sections: Section[];
}

interface Section {
  title: string;
  lectures: Lecture[];
}

interface Lecture {
  title: string;
  video_url: string;
  video_playback_time: string;
  sequence: number;
}

const MyCourses = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCourses = async () => {
    if (userData != null) {
      try {
        setLoading(true);
        const response: any = await userServices.GetMyCourses(userData.email);
        setMyCourses(response.data.data.items);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  // Calculate course statistics
  const getCourseStats = (course: Course) => {
    const totalLectures = course.sections.reduce(
      (total, section) => total + section.lectures.length,
      0
    );

    // Parse time in HH:MM:SS format and convert to total seconds
    const parseTimeToSeconds = (timeStr: string) => {
      if (!timeStr) return 0;
      const parts = timeStr.split(':').map((part) => parseInt(part) || 0);
      if (parts.length === 3) {
        const [hours, minutes, seconds] = parts;
        return hours * 3600 + minutes * 60 + seconds;
      }
      return 0;
    };

    const totalDurationInSeconds = course.sections.reduce((total, section) => {
      return (
        total +
        section.lectures.reduce((sectionTotal, lecture) => {
          return sectionTotal + parseTimeToSeconds(lecture.video_playback_time);
        }, 0)
      );
    }, 0);

    return {
      totalLectures,
      totalDuration: Math.round(totalDurationInSeconds / 60),
      sections: course.sections.length,
    };
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
  };

  if (loading) {
    return <CandleStickLoader />;
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-gray-600">
            Continue your learning journey with your purchased courses
          </p>
          <div className="flex items-center gap-6 mt-4 text-sm text-white">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{myCourses.length} Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Lifetime Access</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {myCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              You haven't purchased any courses yet. Start learning today!
            </p>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course: any, index: number) => {
              const stats = getCourseStats(course);
              return (
                <div
                  key={index}
                  className="bg-transparent rounded-xl shadow-sm border border-zinc-700 hover:shadow-md transition-shadow duration-200 overflow-hidden group flex flex-col h-full"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail || '/api/placeholder/400/200'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-5 h-5 text-red-600 ml-0.5" />
                      </div>
                    </div>
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
                      <p className="text-gray-600 text-sm line-clamp-2 leading-5">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{stats.sections} sections</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        <span>{stats.totalLectures} lectures</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDuration(stats.totalDuration)}</span>
                      </div>
                    </div>

                    {/* Continue Learning Button - Pushed to bottom */}
                    <div className="mt-auto">
                      <button
                        className="w-full bg-green-900 hover:bg-green-950 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
                        onClick={() => navigate(`/mycourses/${course._id}`, { state: { course } })}
                      >
                        <span>Continue Learning</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
