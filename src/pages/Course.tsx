import { MarkdownRenderer, Toast } from '@/components';
import { goToSection } from '@/components/Footer';
import { userServices } from '@/services';
import { UserData } from '@/store/slices/auth.slice';
import { ArrowLeft, BookOpen, Clock, Play, Star, Trophy, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Button = ({
  btnClass,
  handler,
  name,
}: {
  btnClass: string;
  handler: () => void;
  name: string;
}) => (
  <button className={btnClass} onClick={handler}>
    {name}
  </button>
);

const Course = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { state } = useLocation();
  const navigate = useNavigate();
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  let user: UserData;
  if (isLogin) {
    user = useSelector((state: any) => state.auth.user);
  }

  const course = {
    _id: state.course._id,
    title: state.course.title,
    description: state.course.description,
    thumbnail: state.course.thumbnail,
    price: state.course.price,
    averageRating: state.course.averageRating,
    users: state.course.users,
    featured: state.course.featured,
    sections: state.course.sections,
    reviews: state.course.reviews,
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'curriculum', name: 'Curriculum', icon: Trophy },
    { id: 'reviews', name: 'Reviews', icon: Star },
  ];

  useEffect(() => {
    goToSection('course-mainSection', 100);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-10" id="course-mainSection">
      {/* Header Section */}
      <div className="relative">
        {/* Background Image with Overlay */}
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover object-top opacity-50 blur-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent sm:from-black" />

          {/* Course Header Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
              <div className="max-w-full lg:max-w-4xl xl:max-w-5xl">
                {/* Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center text-gray-300 hover:text-white mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft size={16} className="mr-2 sm:mr-2" />
                  <span className="hidden xs:inline">Back to Courses</span>
                  <span className="xs:hidden">Back</span>
                </button>

                {/* Featured Badge */}
                {course.featured && (
                  <div className="inline-block bg-green-950 text-green-400 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                    FEATURED
                  </div>
                )}

                {/* Title and Stats */}
                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                  {course.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current mr-1" size={14} />
                    <span className="font-medium">{course.averageRating || 5}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="text-gray-400 mr-1" size={14} />
                    <span className="hidden xs:inline">{course.users || 100} students</span>
                    <span className="xs:hidden">{course.users || 100}</span>
                  </div>
                </div>

                {/* Price and Enroll */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4">
                  <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
                    ₹{course.price}
                  </span>
                  <Button
                    btnClass="w-52 xs:w-auto bg-green-600 hover:bg-green-700 px-4 xs:px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    handler={async () => {
                      if (isLogin) {
                        await Toast.promise(userServices.AddToCart(user.email, state.course._id), {
                          loading: 'Adding to cart',
                          success: (response) => {
                            navigate('/cart');
                            return `${response.data.message}`;
                          },
                          error: (error) => {
                            console.log(error);
                            return `${error.response.data.message}`;
                          },
                        });
                      } else {
                        navigate('/login');
                      }
                    }}
                    name="Enroll Now"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Main Content Area */}
          <div className="xl:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b border-zinc-700 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 sm:px-4 md:px-6 py-3 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    <span className="hidden xs:inline">{tab.name}</span>
                    <span className="xs:hidden">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px] sm:min-h-[400px]">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Course Overview</h2>
                  <div className="">
                    <MarkdownRenderer content={course.description} />
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Course Curriculum</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Sample curriculum - replace with actual data */}
                    {course.sections.map((section: any, index: number) => (
                      <div
                        key={index}
                        className="bg-zinc-900/50 rounded-lg p-3 sm:p-4 border border-zinc-700 flex"
                      >
                        <div className="bg-green-950 text-green-400 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-medium mr-3 sm:mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-y-2">
                          <h3 className="font-medium text-white text-sm sm:text-base leading-tight">
                            {section.title}
                          </h3>
                          <div className="flex flex-col gap-y-2">
                            {section.lectures.map((lecture: any, index: number) => (
                              <div
                                key={index}
                                className="text-md sm:text-sm bg-green-950/40 text-green-200 p-2 rounded-md flex justify-between items-center"
                              >
                                <div className="flex flex-col px-1 gap-y-2">
                                  <p className="text-white flex  items-center gap-x-3">
                                    <Play className="w-8 h-8 text-gray-400 border rounded-full p-2 bg-green-950 border-green-700" />{' '}
                                    {lecture.title}
                                  </p>
                                </div>
                                <span className="bg-white/80 font-semibold text-black m-2 p-2 rounded-full text-xs">
                                  {lecture.video_playback_time}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Student Reviews</h2>
                  <div className="space-y-4 sm:space-y-6">
                    {/* Sample reviews */}
                    {course.reviews.length > 0 ? (
                      course.reviews.map((review: any, index: number) => (
                        <div
                          key={index}
                          className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 border border-zinc-700"
                        >
                          <div className="flex flex-col xs:flex-row xs:items-center mb-3 gap-2 xs:gap-0">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-600'
                                  }
                                />
                              ))}
                            </div>
                            <span className="xs:ml-3 font-medium text-white text-sm sm:text-base">
                              {review.name}
                            </span>
                            <p>{review.userId.name}</p>
                          </div>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {review.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No reviews yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <div className="xl:sticky xl:top-24">
              {/* Course Stats */}
              <div className="bg-zinc-900/50 rounded-lg p-4 sm:p-6 border border-zinc-700">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Course Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <Clock className="text-gray-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" size={16} />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-400">Students Enrolled</p>
                      <p className="font-medium text-sm sm:text-base">{course.users || 100}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
