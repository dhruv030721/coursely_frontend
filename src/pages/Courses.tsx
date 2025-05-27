import { useState } from 'react';
import { Search, Star, BookOpen, Filter } from 'lucide-react';
import { CourseCard, Input } from "@/components"

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Technical Analysis',
    'Fundamental Analysis',
    'Options Trading',
    'Forex',
    'Day Trading',
    'Swing Trading',
    'Investing'
  ];

  const courses = [
    {
      id: 1,
      title: 'Technical Analysis Masterclass',
      instructor: 'Sarah Johnson',
      description: 'Learn how to read charts and identify patterns to make profitable trading decisions.',
      level: 'Intermediate',
      rating: 4.8,
      students: 15243,
      duration: '22 hours',
      price: 99.99,
      category: 'Technical Analysis',
      image: '/api/placeholder/320/180',
      featured: true
    },
    {
      id: 2,
      title: 'Fundamental Analysis for Long-Term Investing',
      instructor: 'Michael Chen',
      description: 'Understand how to analyze financial statements and value companies for long-term investment.',
      level: 'Beginner',
      rating: 4.9,
      students: 23567,
      duration: '28 hours',
      price: 129.99,
      category: 'Fundamental Analysis',
      image: '/api/placeholder/320/180',
      featured: true
    },
    {
      id: 3,
      title: 'Options Trading Strategies',
      instructor: 'Robert Williams',
      description: 'Master advanced options strategies to generate income and hedge your portfolio.',
      level: 'Advanced',
      rating: 4.7,
      students: 8754,
      duration: '19 hours',
      price: 149.99,
      category: 'Options Trading',
      image: '/api/placeholder/320/180',
      featured: false
    },
    {
      id: 4,
      title: 'Day Trading for Beginners',
      instructor: 'Emily Rodriguez',
      description: 'Learn the fundamentals of day trading with risk management and strategy development.',
      level: 'Beginner',
      rating: 4.6,
      students: 12879,
      duration: '15 hours',
      price: 89.99,
      category: 'Day Trading',
      image: '/api/placeholder/320/180',
      featured: false
    },
    {
      id: 5,
      title: 'Forex Trading Fundamentals',
      instructor: 'David Thompson',
      description: 'Understand currency markets and develop effective forex trading strategies.',
      level: 'Intermediate',
      rating: 4.5,
      students: 9632,
      duration: '24 hours',
      price: 119.99,
      category: 'Forex',
      image: '/api/placeholder/320/180',
      featured: false
    },
    {
      id: 6,
      title: 'Swing Trading Master Course',
      instructor: 'Jessica Lee',
      description: 'Learn how to capture short to medium-term gains in the stock market with technical analysis.',
      level: 'Intermediate',
      rating: 4.7,
      students: 7865,
      duration: '18 hours',
      price: 109.99,
      category: 'Swing Trading',
      image: '/api/placeholder/320/180',
      featured: false
    },
    {
      id: 7,
      title: 'Value Investing: Warren Buffett Method',
      instructor: 'Thomas Baker',
      description: 'Discover the investment strategies used by Warren Buffett to build long-term wealth.',
      level: 'Beginner',
      rating: 4.9,
      students: 25467,
      duration: '26 hours',
      price: 139.99,
      category: 'Investing',
      image: '/api/placeholder/320/180',
      featured: true
    },
    {
      id: 8,
      title: 'Candlestick Patterns and Chart Reading',
      instructor: 'Andrew Wilson',
      description: 'Master Japanese candlestick patterns to identify market reversals and continuations.',
      level: 'Intermediate',
      rating: 4.6,
      students: 11243,
      duration: '16 hours',
      price: 79.99,
      category: 'Technical Analysis',
      image: '/api/placeholder/320/180',
      featured: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = courses.filter(course => course.featured);

  return (
    <div id='CoursesSection' className="relative min-h-screen bg-black text-gray-100 pt-20">

      {/* Hero Section */}
      <section className="bg-gradient-to-t from-black via-green-950/50 to-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Invest in Your <span className="text-green-400">Financial Future</span></h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Our expert-led stock market courses give you the knowledge and skills to trade with confidence and build wealth for the long term.
          </p>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Star className="text-yellow-400 mr-2" size={24} />
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0 flex items-center">
              <BookOpen className="text-teal-400 mr-2" size={24} />
              Browse All Courses
            </h2>
            <div className='flex flex-col items-end'>
                <Input
                  name='search'
                  type="text"
                  placeholder="Search courses..."
                  divClasses="w-1/2 text-gray-100 rounded-lg py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  icon={<Search className="text-white" size={18} />}
                  handler={(e) => setSearchQuery(e.target.value)}
                />
              <div className="flex items-center">
                <Filter className="text-gray-400 mr-2" size={18} />
                <span className="text-gray-300 mr-2">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 text-sm rounded-md transition ${selectedCategory === category
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/50 text-black hover:bg-yellow-200'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No courses found matching your criteria</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-yellow-700 hover:text-teal-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Users className="text-teal-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-2">50,000+</h3>
              <p className="text-gray-400">Students</p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <BookOpen className="text-teal-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-2">120+</h3>
              <p className="text-gray-400">Courses</p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <TrendingUp className="text-teal-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-2">85%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <DollarSign className="text-teal-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-2">$2.5M+</h3>
              <p className="text-gray-400">Student Profits</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}