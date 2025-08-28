import { BookOpen, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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

const CoursePlayer = () => {
  const { state } = useLocation();
  const course = state.course;
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerIdRef = useRef<string>('');

  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Helper function to determine video type
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
            console.log('Player is ready');
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

          // Handle VHS quality levels
          playerRef.current.on('loadedmetadata', () => {
            if (!isComponentMounted || !playerRef.current) return;
            try {
              const player = playerRef.current;
              if (player.tech(true) && player.tech(true).vhs) {
                const vhs = player.tech(true).vhs;
                if (vhs.playlists && vhs.playlists.master) {
                  const representations = vhs.playlists.master.playlists;
                  console.log('Available quality representations:', representations.length);
                }
              }
            } catch (error) {
              console.warn('Error accessing VHS:', error);
            }
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-gray-400 mb-4">Please select a course to continue.</p>
          <button
            onClick={() => navigate('/my-courses')}
            className="px-6 py-3 bg-green-900 hover:bg-green-950 rounded-lg transition-colors"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar - Course Content */}
      <div
        className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-zinc-900 pt-20 border-r border-t border-zinc-700 flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-zinc-700">
          <div className="flex items-center justify-end mb-3">
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
          </div>

          {!sidebarCollapsed && (
            <>
              <h2 className="text-lg font-semibold text-white line-clamp-2 mb-2">{course.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-400">
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
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto">
            {course.sections.map((section: Section, sectionIndex: number) => (
              <div key={sectionIndex} className="border-b border-zinc-800">
                <button
                  onClick={() => toggleSectionExpansion(sectionIndex)}
                  className="w-full p-4 text-left hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium line-clamp-2">{section.title}</h3>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedSections.has(sectionIndex) ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{section.lectures.length} lectures</p>
                </button>

                {/* Lectures List */}
                {expandedSections.has(sectionIndex) && (
                  <div className="bg-zinc-800">
                    {section.lectures.map((lecture, lectureIndex) => {
                      const isActive =
                        currentSectionIndex === sectionIndex &&
                        currentLectureIndex === lectureIndex;
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
                                <Play className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm line-clamp-2 ${isActive ? 'text-white' : 'text-gray-300'}`}
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
          </div>
        )}
      </div>

      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col mt-20">
        {/* Video Player */}
        <div className="bg-black aspect-video relative" ref={containerRef}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p>Loading video...</p>
              </div>
            </div>
          )}

          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
              <div className="text-white text-center">
                <p className="text-red-400 mb-4">{videoError}</p>
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
                  className="px-4 py-2 bg-green-900 hover:bg-green-950 rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Video element will be dynamically created here */}
        </div>

        {/* Video Controls & Info */}
        <div className="bg-zinc-900 border-t border-zinc-700 p-6">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousLecture}
              disabled={currentSectionIndex === 0 && currentLectureIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-1">
                {currentLecture?.title || 'Select a lecture'}
              </h3>
              <p className="text-sm text-gray-400">
                Lecture {currentLectureIndex + 1} of{' '}
                {course.sections[currentSectionIndex]?.lectures.length || 0}
              </p>
            </div>

            <button
              onClick={handleNextLecture}
              disabled={
                currentSectionIndex === course.sections.length - 1 &&
                currentLectureIndex === course.sections[currentSectionIndex]?.lectures.length - 1
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-900 hover:bg-green-950 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
