import { Toast } from '@/components';
import { userServices } from '@/services';
import { RootState } from '@/store';
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  Settings,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

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

interface QualityLevel {
  height: number;
  width: number;
  bitrate: number;
  id: string;
  enabled: boolean;
}

interface Review {
  rating: number;
  message: string;
}

const SidebarContent = ({
  course,
  isMobile,
  sidebarCollapsed,
  setMobileMenuOpen,
  setSidebarCollapsed,
  stats,
  expandedSections,
  toggleSectionExpansion,
  currentSectionIndex,
  currentLectureIndex,
  handleLectureSelect,
  isLectureCompleted,
  formatDuration,
  isReviewExpanded,
  setIsReviewExpanded,
  review,
  setReview,
  hoveredRating,
  setHoveredRating,
  handleReviewSubmit,
}: {
  course: any;
  isMobile: boolean;
  sidebarCollapsed: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  stats: any;
  expandedSections: Set<number>;
  toggleSectionExpansion: (index: number) => void;
  currentSectionIndex: number;
  currentLectureIndex: number;
  handleLectureSelect: (sectionIndex: number, lectureIndex: number) => void;
  isLectureCompleted: (sectionIndex: number, lectureIndex: number) => boolean;
  formatDuration: (timeStr: string) => string;
  isReviewExpanded: boolean;
  setIsReviewExpanded: (expanded: boolean) => void;
  review: Review;
  setReview: (review: Review | ((prev: Review) => Review)) => void;
  hoveredRating: number;
  setHoveredRating: (rating: number) => void;
  handleReviewSubmit: (rating: number, message: string) => void;
}) => (
  <>
    {/* Sidebar Header */}
    <div className="p-3 md:p-4 border-b border-zinc-700">
      <div className="flex items-center justify-between mb-3">
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {!isMobile && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 border rounded-full" />
            ) : (
              <ChevronLeft className="w-5 h-5 border rounded-full" />
            )}
          </button>
        )}
      </div>

      {(!sidebarCollapsed || isMobile) && (
        <>
          <h2 className="text-base md:text-lg font-semibold text-white line-clamp-2 mb-2">
            {course.title}
          </h2>
          <div className="flex items-center gap-2 md:gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {stats.lectures} lectures
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {stats.completed}/{stats.lectures}
            </span>
          </div>
        </>
      )}
    </div>

    {/* Course Sections */}
    {(!sidebarCollapsed || isMobile) && (
      <div className="flex-1 overflow-y-auto">
        {course.sections.map((section: Section, sectionIndex: number) => (
          <div key={sectionIndex} className="border-b border-zinc-800">
            <button
              onClick={() => toggleSectionExpansion(sectionIndex)}
              className="w-full p-3 md:p-4 text-left hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium line-clamp-2 text-sm md:text-base">
                  {section.title}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${
                    expandedSections.has(sectionIndex) ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{section.lectures.length} lectures</p>
            </button>

            {/* Lectures List */}
            {expandedSections.has(sectionIndex) && (
              <div className="bg-zinc-800">
                {section.lectures.map((lecture: any, lectureIndex: number) => {
                  const isActive =
                    currentSectionIndex === sectionIndex && currentLectureIndex === lectureIndex;
                  const isCompleted = isLectureCompleted(sectionIndex, lectureIndex);

                  return (
                    <button
                      key={lectureIndex}
                      onClick={() => handleLectureSelect(sectionIndex, lectureIndex)}
                      className={`w-full p-3 text-left hover:bg-zinc-700 transition-colors border-l-2 ${
                        isActive ? 'border-green-600 bg-zinc-700' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Play className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs md:text-sm line-clamp-2 ${isActive ? 'text-white' : 'text-gray-300'}`}
                          >
                            {lecture.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDuration(lecture.video_playback_time)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Course Review Section */}
        <div className="border-b border-zinc-800">
          <button
            onClick={() => setIsReviewExpanded(!isReviewExpanded)}
            disabled={course.isReviewed}
            className="w-full p-3 md:p-4 text-left hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium flex items-center gap-2 text-sm md:text-base">
                <Star className="w-4 h-4" />
                {course.isReviewed ? 'Already Reviewed!' : 'Course Review'}
              </h3>
              {!course.isReviewed && (
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isReviewExpanded ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>
          </button>

          {isReviewExpanded && (
            <div className="bg-zinc-800 p-3 md:p-4 text-sm">
              <div className="space-y-4">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rate this course
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setReview((prev) => ({ ...prev, rating: star }))}
                        className="text-xl md:text-2xl transition-colors focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 md:w-6 md:h-6 ${
                            star <= (hoveredRating || review.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs md:text-sm text-gray-400">
                      {review.rating > 0 && `${review.rating} star${review.rating > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Write your review
                  </label>
                  <textarea
                    value={review.message}
                    onChange={(e) => setReview((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Share your thoughts about this course..."
                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none text-sm"
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setReview({ rating: 0, message: '' });
                      setHoveredRating(0);
                    }}
                    className="text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => handleReviewSubmit(review.rating, review.message)}
                    disabled={review.rating === 0 || !review.message.trim() || course.isReviewed}
                    className="px-3 md:px-4 py-2 bg-green-900 hover:bg-green-950 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white text-xs md:text-sm rounded-lg transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </>
);

const CoursePlayer = () => {
  const { state } = useLocation();
  const course = state?.course;
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerIdRef = useRef<string>('');
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Quality selector states
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<string>('auto');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [currentQuality, setCurrentQuality] = useState<string>('auto');

  // Review states
  const [review, setReview] = useState<Review>({ rating: 0, message: '' });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getVideoType = (url: string) => {
    if (url.includes('.m3u8')) {
      return 'application/x-mpegURL';
    } else if (url.includes('.mp4')) {
      return 'video/mp4';
    } else if (url.includes('.webm')) {
      return 'video/webm';
    }
    // Default to HLS if uncertain
    return 'application/x-mpegURL';
  };

  const formatQualityLabel = (level: QualityLevel) => {
    if (level.height >= 2160) return '4K';
    if (level.height >= 1440) return '2K';
    if (level.height >= 1080) return '1080p';
    if (level.height >= 720) return '720p';
    if (level.height >= 480) return '480p';
    if (level.height >= 360) return '360p';
    return `${level.height}p`;
  };

  const updateQualityLevels = () => {
    if (!playerRef.current) return;

    try {
      const player = playerRef.current;
      if (player.tech(true) && player.tech(true).vhs) {
        const vhs = player.tech(true).vhs;
        if (vhs.playlists && vhs.playlists.master) {
          const representations = vhs.playlists.master.playlists;

          const levels: QualityLevel[] = representations
            .filter((rep: any) => rep.attributes && rep.attributes.RESOLUTION)
            .map((rep: any, index: number) => ({
              height: rep.attributes.RESOLUTION.height,
              width: rep.attributes.RESOLUTION.width,
              bitrate: rep.attributes.BANDWIDTH || 0,
              id: `${index}`,
              enabled: true,
            }))
            .sort((a: QualityLevel, b: QualityLevel) => b.height - a.height);

          setQualityLevels(levels);

          // Get current quality
          const currentRep = vhs.playlists.media();
          if (currentRep && currentRep.attributes && currentRep.attributes.RESOLUTION) {
            const currentHeight = currentRep.attributes.RESOLUTION.height;
            const currentLevel = levels.find((level) => level.height === currentHeight);
            if (currentLevel) {
              setCurrentQuality(formatQualityLabel(currentLevel));
            }
          }
        }
      }
    } catch (error) {
      console.warn('Error updating quality levels:', error);
    }
  };

  const handleQualityChange = (qualityId: string) => {
    if (!playerRef.current) return;

    try {
      const player = playerRef.current;
      if (player.tech(true) && player.tech(true).vhs) {
        const vhs = player.tech(true).vhs;

        if (qualityId === 'auto') {
          // Enable auto quality selection
          vhs.playlists.master.playlists.forEach((playlist: any) => {
            playlist.disabled = false;
          });
          setSelectedQuality('auto');
          setCurrentQuality('Auto');
        } else {
          // Disable all playlists first
          vhs.playlists.master.playlists.forEach((playlist: any) => {
            playlist.disabled = true;
          });

          // Enable only the selected quality
          const selectedIndex = parseInt(qualityId);
          if (vhs.playlists.master.playlists[selectedIndex]) {
            vhs.playlists.master.playlists[selectedIndex].disabled = false;
            const selectedLevel = qualityLevels[selectedIndex];
            if (selectedLevel) {
              setSelectedQuality(qualityId);
              setCurrentQuality(formatQualityLabel(selectedLevel));
            }
          }
        }

        setShowQualityMenu(false);
      }
    } catch (error) {
      console.error('Error changing quality:', error);
    }
  };

  // Handle review submission
  const handleReviewSubmit = async (rating: number, message: string) => {
    console.log(user);
    const reviewData = {
      courseId: course?._id,
      userId: user?._id,
      rating,
      message,
    };

    if (reviewData.userId != undefined || reviewData.userId != null) {
      await Toast.promise(
        userServices.CreateReview(
          reviewData.userId,
          reviewData.courseId,
          reviewData.rating,
          reviewData.message
        ),
        {
          loading: 'Review Sending',
          success: (response) => {
            return `${response.data.message}`;
          },
          error: (error) => {
            return `${error.responsee.data.message}`;
          },
        }
      );
    } else {
      Toast.error('Email not found! Kindly request to relogin');
    }

    setIsReviewExpanded(false);
  };

  // Initialize Video.js player with HLS support
  useEffect(() => {
    let isComponentMounted = true;
    let timeoutId: NodeJS.Timeout;

    const destroyPlayer = () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (error) {
          console.warn('Error disposing player:', error);
        } finally {
          playerRef.current = null;
        }
      }
    };

    const createVideoElement = () => {
      if (!containerRef.current) return null;

      // Remove existing video element
      const existingVideo = containerRef.current.querySelector('video');
      if (existingVideo) {
        existingVideo.remove();
      }

      // Create new video element
      const videoElement = document.createElement('video');
      const playerId = `video-player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      videoElement.id = playerId;
      videoElement.className = 'video-js vjs-default-skin w-full h-full';
      videoElement.setAttribute('playsInline', 'true');
      videoElement.setAttribute('preload', 'auto');
      videoElement.setAttribute('data-setup', '{}');

      containerRef.current.appendChild(videoElement);
      playerIdRef.current = playerId;

      return videoElement;
    };

    const initializePlayer = () => {
      if (!currentLecture || !isComponentMounted) return;

      setIsLoading(true);
      setVideoError(null);
      setQualityLevels([]);
      setSelectedQuality('auto');
      setCurrentQuality('Auto');

      // Destroy existing player
      destroyPlayer();

      // Clear any pending timeouts
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Create new video element and initialize player after a delay
      timeoutId = setTimeout(() => {
        if (!isComponentMounted) return;

        try {
          const videoElement = createVideoElement();
          if (!videoElement || !isComponentMounted) return;

          // Initialize player
          playerRef.current = videojs(videoElement, {
            controls: true,
            responsive: true,
            fluid: true,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            html5: {
              vhs: {
                overrideNative: true,
                enableLowInitialPlaylist: true,
                smoothQualityChange: true,
                useBandwidthFromLocalStorage: true,
              },
              nativeAudioTracks: false,
              nativeVideoTracks: false,
            },
          });

          if (!isComponentMounted || !playerRef.current) return;

          // Set the video source
          playerRef.current.src({
            src: currentLecture.video_url,
            type: getVideoType(currentLecture.video_url),
          });

          // Event listeners
          playerRef.current.ready(() => {
            if (!isComponentMounted) return;
            setIsLoading(false);
          });

          playerRef.current.on('loadstart', () => {
            if (!isComponentMounted) return;
            setIsLoading(true);
          });

          playerRef.current.on('canplay', () => {
            if (!isComponentMounted) return;
            setIsLoading(false);
          });

          playerRef.current.on('error', (error: any) => {
            if (!isComponentMounted) return;
            console.error('Video error:', error);
            setVideoError('Failed to load video. Please try again.');
            setIsLoading(false);
          });

          playerRef.current.on('ended', () => {
            if (!isComponentMounted) return;
            handleLectureComplete();
            handleNextLecture();
          });

          playerRef.current.on('timeupdate', () => {
            if (!isComponentMounted || !playerRef.current) return;
            try {
              const currentTime = playerRef.current.currentTime();
              const duration = playerRef.current.duration();
              if (duration && currentTime / duration > 0.8) {
                handleLectureComplete();
              }
            } catch (error) {
              // Ignore timeupdate errors
            }
          });

          // Handle VHS quality levels and updates
          playerRef.current.on('loadedmetadata', () => {
            if (!isComponentMounted || !playerRef.current) return;
            setTimeout(() => {
              updateQualityLevels();
            }, 1000);
          });

          // Listen for quality changes
          playerRef.current.on('qualityLevelsChange', () => {
            if (!isComponentMounted) return;
            updateQualityLevels();
          });

          // Listen for playlist changes to update current quality
          playerRef.current.tech(true).on('usage', () => {
            if (!isComponentMounted) return;
            setTimeout(() => {
              updateQualityLevels();
            }, 500);
          });
        } catch (error) {
          console.error('Error initializing player:', error);
          if (isComponentMounted) {
            setVideoError('Failed to initialize video player.');
            setIsLoading(false);
          }
        }
      }, 200);
    };

    initializePlayer();

    return () => {
      isComponentMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      destroyPlayer();
    };
  }, [currentLecture]);

  // Set initial lecture when course loads
  useEffect(() => {
    if (course && course.sections.length > 0) {
      const firstSection = course.sections[0];
      if (firstSection.lectures.length > 0) {
        setCurrentLecture(firstSection.lectures[0]);
        setCurrentSectionIndex(0);
        setCurrentLectureIndex(0);
      }
    }
  }, [course]);

  const handleLectureSelect = (sectionIndex: number, lectureIndex: number) => {
    const lecture = course?.sections[sectionIndex]?.lectures[lectureIndex];
    if (lecture) {
      setCurrentLecture(lecture);
      setCurrentSectionIndex(sectionIndex);
      setCurrentLectureIndex(lectureIndex);
      setVideoError(null);
      // Close mobile menu after selection
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    }
  };

  const handleNextLecture = () => {
    if (!course) return;

    let nextSectionIndex = currentSectionIndex;
    let nextLectureIndex = currentLectureIndex + 1;

    // Check if we need to move to next section
    if (nextLectureIndex >= course.sections[currentSectionIndex].lectures.length) {
      nextSectionIndex = currentSectionIndex + 1;
      nextLectureIndex = 0;
    }

    // Check if there's a next lecture
    if (nextSectionIndex < course.sections.length) {
      const nextLecture = course.sections[nextSectionIndex].lectures[nextLectureIndex];
      if (nextLecture) {
        setCurrentLecture(nextLecture);
        setCurrentSectionIndex(nextSectionIndex);
        setCurrentLectureIndex(nextLectureIndex);

        // Auto-expand the next section
        setExpandedSections((prev) => new Set([...prev, nextSectionIndex]));
      }
    }
  };

  const handlePreviousLecture = () => {
    if (!course) return;

    let prevSectionIndex = currentSectionIndex;
    let prevLectureIndex = currentLectureIndex - 1;

    // Check if we need to move to previous section
    if (prevLectureIndex < 0) {
      prevSectionIndex = currentSectionIndex - 1;
      if (prevSectionIndex >= 0) {
        prevLectureIndex = course.sections[prevSectionIndex].lectures.length - 1;
      } else {
        return; // No previous lecture
      }
    }

    // Check if there's a previous lecture
    if (prevSectionIndex >= 0) {
      const prevLecture = course.sections[prevSectionIndex].lectures[prevLectureIndex];
      if (prevLecture) {
        setCurrentLecture(prevLecture);
        setCurrentSectionIndex(prevSectionIndex);
        setCurrentLectureIndex(prevLectureIndex);

        // Auto-expand the previous section
        setExpandedSections((prev) => new Set([...prev, prevSectionIndex]));
      }
    }
  };

  const handleLectureComplete = () => {
    if (currentLecture) {
      const lectureId = `${currentSectionIndex}-${currentLectureIndex}`;
      setCompletedLectures((prev) => new Set([...prev, lectureId]));
    }
  };

  const toggleSectionExpansion = (sectionIndex: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionIndex)) {
        newSet.delete(sectionIndex);
      } else {
        newSet.add(sectionIndex);
      }
      return newSet;
    });
  };

  const formatDuration = (timeStr: string) => {
    if (!timeStr) return '0:00';
    const parts = timeStr.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parseInt(parts[2]);

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    }
    return timeStr;
  };

  const getTotalStats = () => {
    if (!course) return { lectures: 0, duration: 0 };

    const totalLectures = course.sections.reduce(
      (total: number, section: Section) => total + section.lectures.length,
      0
    );

    const completedCount = completedLectures.size;
    const progressPercentage = totalLectures > 0 ? (completedCount / totalLectures) * 100 : 0;

    return { lectures: totalLectures, completed: completedCount, progress: progressPercentage };
  };

  const isLectureCompleted = (sectionIndex: number, lectureIndex: number) => {
    return completedLectures.has(`${sectionIndex}-${lectureIndex}`);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-white text-center max-w-md">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-gray-400 mb-4 text-sm md:text-base">
            Please select a course to continue.
          </p>
          <button
            onClick={() => navigate('/my-courses')}
            className="px-4 md:px-6 py-2 md:py-3 bg-green-900 hover:bg-green-950 rounded-lg transition-colors text-sm md:text-base"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div
            className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-zinc-900 pt-20 border-r border-t border-zinc-700 flex flex-col transition-all duration-300`}
          >
            <SidebarContent
              course={course}
              isMobile={isMobile}
              sidebarCollapsed={sidebarCollapsed}
              setMobileMenuOpen={setMobileMenuOpen}
              setSidebarCollapsed={setSidebarCollapsed}
              stats={stats}
              expandedSections={expandedSections}
              toggleSectionExpansion={toggleSectionExpansion}
              currentSectionIndex={currentSectionIndex}
              currentLectureIndex={currentLectureIndex}
              handleLectureSelect={handleLectureSelect}
              isLectureCompleted={isLectureCompleted}
              formatDuration={formatDuration}
              isReviewExpanded={isReviewExpanded}
              setIsReviewExpanded={setIsReviewExpanded}
              review={review}
              setReview={setReview}
              hoveredRating={hoveredRating}
              setHoveredRating={setHoveredRating}
              handleReviewSubmit={handleReviewSubmit}
            />
          </div>
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <div
            className={`fixed left-0 top-0 h-full w-80 max-w-[80vw] bg-zinc-900 border-r border-zinc-700 flex flex-col transition-transform duration-300 z-50 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="pt-4">
              <SidebarContent
                course={course}
                isMobile={isMobile}
                sidebarCollapsed={sidebarCollapsed}
                setMobileMenuOpen={setMobileMenuOpen}
                setSidebarCollapsed={setSidebarCollapsed}
                stats={stats}
                expandedSections={expandedSections}
                toggleSectionExpansion={toggleSectionExpansion}
                currentSectionIndex={currentSectionIndex}
                currentLectureIndex={currentLectureIndex}
                handleLectureSelect={handleLectureSelect}
                isLectureCompleted={isLectureCompleted}
                formatDuration={formatDuration}
                isReviewExpanded={isReviewExpanded}
                setIsReviewExpanded={setIsReviewExpanded}
                review={review}
                setReview={setReview}
                hoveredRating={hoveredRating}
                setHoveredRating={setHoveredRating}
                handleReviewSubmit={handleReviewSubmit}
              />{' '}
            </div>
          </div>
        )}

        {/* Main Content - Video Player */}
        <div className={`flex-1 flex flex-col ${isMobile ? 'pt-16' : 'mt-20'}`}>
          {/* Video Player */}
          <div className="bg-black aspect-video relative" ref={containerRef}>
            {/* Quality Selector - Positioned over the video */}
            {qualityLevels.length > 0 && (
              <div className="absolute top-2 md:top-4 right-2 md:right-4 z-20">
                <div className="relative">
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 bg-black bg-opacity-70 text-white text-xs md:text-sm rounded-md md:rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    <Settings className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">{currentQuality}</span>
                    <ChevronDown
                      className={`w-2 h-2 md:w-3 md:h-3 transition-transform ${showQualityMenu ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Quality Menu */}
                  {showQualityMenu && (
                    <div className="absolute top-full right-0 mt-1 md:mt-2 bg-black bg-opacity-90 rounded-md md:rounded-lg overflow-hidden min-w-20 md:min-w-32 border border-zinc-600">
                      <button
                        onClick={() => handleQualityChange('auto')}
                        className={`w-full px-2 md:px-4 py-1 md:py-2 text-left text-xs md:text-sm hover:bg-zinc-700 transition-colors ${
                          selectedQuality === 'auto' ? 'text-green-400 bg-zinc-800' : 'text-white'
                        }`}
                      >
                        Auto
                      </button>
                      {qualityLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => handleQualityChange(level.id)}
                          className={`w-full px-2 md:px-4 py-1 md:py-2 text-left text-xs md:text-sm hover:bg-zinc-700 transition-colors ${
                            selectedQuality === level.id
                              ? 'text-green-400 bg-zinc-800'
                              : 'text-white'
                          }`}
                        >
                          {formatQualityLabel(level)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                <div className="text-white text-center px-4">
                  <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-green-600 mx-auto mb-2 md:mb-4"></div>
                  <p className="text-sm md:text-base">Loading video...</p>
                </div>
              </div>
            )}

            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
                <div className="text-white text-center px-4 max-w-md">
                  <p className="text-red-400 mb-4 text-sm md:text-base">{videoError}</p>
                  <button
                    onClick={() => {
                      setVideoError(null);
                      setIsLoading(true);
                      // Force re-render by creating a new lecture object
                      if (currentLecture) {
                        const newLecture = { ...currentLecture };
                        setCurrentLecture(null);
                        setTimeout(() => {
                          setCurrentLecture(newLecture);
                        }, 300);
                      }
                    }}
                    className="px-3 md:px-4 py-2 bg-green-900 hover:bg-green-950 rounded-lg transition-colors text-sm md:text-base"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Video element will be dynamically created here */}
          </div>

          {/* Video Controls & Info */}
          <div className="bg-zinc-900 border-t border-zinc-700 p-3 md:p-6">
            {/* Current Lecture Info - Mobile Optimized */}
            <div className="text-center mb-4 md:hidden">
              <h3 className="text-base font-semibold text-white mb-1 line-clamp-2">
                {currentLecture?.title || 'Select a lecture'}
              </h3>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>
                  Lecture {currentLectureIndex + 1} of{' '}
                  {course.sections[currentSectionIndex]?.lectures.length || 0}
                </span>
                {qualityLevels.length > 0 && (
                  <span className="text-green-400">• {currentQuality}</span>
                )}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-2 md:gap-4">
              <button
                onClick={handlePreviousLecture}
                disabled={currentSectionIndex === 0 && currentLectureIndex === 0}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs md:text-sm"
              >
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              {/* Desktop Lecture Info */}
              <div className="text-center hidden md:block flex-1">
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                  {currentLecture?.title || 'Select a lecture'}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span>
                    Lecture {currentLectureIndex + 1} of{' '}
                    {course.sections[currentSectionIndex]?.lectures.length || 0}
                  </span>
                  {qualityLevels.length > 0 && (
                    <span className="text-green-400">• {currentQuality}</span>
                  )}
                </div>
              </div>

              <button
                onClick={handleNextLecture}
                disabled={
                  currentSectionIndex === course.sections.length - 1 &&
                  currentLectureIndex === course.sections[currentSectionIndex]?.lectures.length - 1
                }
                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 bg-green-900 hover:bg-green-950 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs md:text-sm"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>

            {/* Progress Bar - Mobile Only */}
            {isMobile && stats.lectures > 0 && (
              <div className="mt-4 pt-4 border-t border-zinc-700">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Course Progress</span>
                  <span>
                    {stats.completed}/{stats.lectures} lectures
                  </span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.progress}%` }}
                  ></div>
                </div>
                <div className="text-center text-xs text-gray-400 mt-1">
                  {Math.round(stats.progress ?? 0)}% Complete
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
