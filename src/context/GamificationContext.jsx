import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Storage key for localStorage
const STORAGE_KEY = 'heritage-gamification';

// Point values for different actions
export const POINTS = {
  VIEW_HERITAGE: 10,
  COMPLETE_QUIZ: 50,
  QUIZ_PERFECT: 25,
  POST_QUIZ_CORRECT: 15,
  DAILY_STREAK: 20,
  ACHIEVEMENT_UNLOCK: 100,
  CONTRIBUTION_APPROVED: 200,
  SHARE_HERITAGE: 5,
  LISTEN_AUDIO: 5,
};

// Level thresholds
export const LEVELS = [
  { level: 1, name: 'Người mới', nameEn: 'Newcomer', threshold: 0 },
  { level: 2, name: 'Khách tham quan', nameEn: 'Visitor', threshold: 100 },
  { level: 3, name: 'Người yêu di sản', nameEn: 'Heritage Lover', threshold: 300 },
  { level: 4, name: 'Nhà nghiên cứu', nameEn: 'Researcher', threshold: 600 },
  { level: 5, name: 'Chuyên gia', nameEn: 'Expert', threshold: 1000 },
  { level: 6, name: 'Bậc thầy', nameEn: 'Master', threshold: 1500 },
  { level: 7, name: 'Huyền thoại', nameEn: 'Legend', threshold: 2500 },
  { level: 8, name: 'Đại sư', nameEn: 'Grandmaster', threshold: 5000 },
];

// Achievement definitions
export const ACHIEVEMENTS = [
  // Explorer achievements
  {
    id: 'first_step',
    name: 'Bước đầu tiên',
    nameEn: 'First Step',
    description: 'Xem 1 di sản',
    descriptionEn: 'View 1 heritage',
    icon: '🗺️',
    category: 'explorer',
    rarity: 'common',
    condition: (progress) => progress.heritagesViewed?.length >= 1,
  },
  {
    id: 'wanderer',
    name: 'Người lang thang',
    nameEn: 'Wanderer',
    description: 'Xem 10 di sản khác nhau',
    descriptionEn: 'View 10 different heritages',
    icon: '🏃',
    category: 'explorer',
    rarity: 'common',
    condition: (progress) => progress.heritagesViewed?.length >= 10,
  },
  {
    id: 'explorer',
    name: 'Nhà thám hiểm',
    nameEn: 'Explorer',
    description: 'Xem 25 di sản khác nhau',
    descriptionEn: 'View 25 different heritages',
    icon: '🧭',
    category: 'explorer',
    rarity: 'uncommon',
    condition: (progress) => progress.heritagesViewed?.length >= 25,
  },
  {
    id: 'master_explorer',
    name: 'Nhà thám hiểm bậc thầy',
    nameEn: 'Master Explorer',
    description: 'Xem tất cả di sản',
    descriptionEn: 'View all heritages',
    icon: '🌍',
    category: 'explorer',
    rarity: 'legendary',
    condition: (progress) => progress.heritagesViewed?.length >= 42,
  },
  // Knowledge achievements
  {
    id: 'quiz_beginner',
    name: 'Người mới chơi quiz',
    nameEn: 'Quiz Beginner',
    description: 'Hoàn thành 1 quiz',
    descriptionEn: 'Complete 1 quiz',
    icon: '🎓',
    category: 'knowledge',
    rarity: 'common',
    condition: (progress) => progress.quizzesCompleted?.length >= 1,
  },
  {
    id: 'scholar',
    name: 'Học giả',
    nameEn: 'Scholar',
    description: 'Đạt 80%+ trong 5 quiz',
    descriptionEn: 'Score 80%+ on 5 quizzes',
    icon: '📚',
    category: 'knowledge',
    rarity: 'uncommon',
    condition: (progress) => {
      const highScores = progress.quizzesCompleted?.filter(q => q.score >= 80) || [];
      return highScores.length >= 5;
    },
  },
  {
    id: 'quiz_master',
    name: 'Bậc thầy Quiz',
    nameEn: 'Quiz Master',
    description: 'Đạt điểm tuyệt đối trong quiz',
    descriptionEn: 'Score 100% on any quiz',
    icon: '🏆',
    category: 'knowledge',
    rarity: 'rare',
    condition: (progress) => {
      return progress.quizzesCompleted?.some(q => q.score === 100);
    },
  },
  // Streak achievements
  {
    id: 'streak_3',
    name: 'Chuỗi 3 ngày',
    nameEn: '3-Day Streak',
    description: 'Duy trì chuỗi 3 ngày liên tiếp',
    descriptionEn: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    condition: (progress) => progress.maxStreak >= 3,
  },
  {
    id: 'streak_7',
    name: 'Chuỗi 7 ngày',
    nameEn: '7-Day Streak',
    description: 'Duy trì chuỗi 7 ngày liên tiếp',
    descriptionEn: 'Maintain a 7-day streak',
    icon: '🔥🔥',
    category: 'streak',
    rarity: 'uncommon',
    condition: (progress) => progress.maxStreak >= 7,
  },
  {
    id: 'streak_30',
    name: 'Chuỗi 30 ngày',
    nameEn: '30-Day Streak',
    description: 'Duy trì chuỗi 30 ngày liên tiếp',
    descriptionEn: 'Maintain a 30-day streak',
    icon: '🔥🔥🔥',
    category: 'streak',
    rarity: 'epic',
    condition: (progress) => progress.maxStreak >= 30,
  },
  // Contribution achievements
  {
    id: 'first_contribution',
    name: 'Người đóng góp',
    nameEn: 'Contributor',
    description: 'Gửi 1 đóng góp',
    descriptionEn: 'Submit 1 contribution',
    icon: '📝',
    category: 'contribution',
    rarity: 'common',
    condition: (progress) => progress.contributions >= 1,
  },
  {
    id: 'photographer',
    name: 'Nhiếp ảnh gia',
    nameEn: 'Photographer',
    description: 'Đóng góp 5 ảnh',
    descriptionEn: 'Contribute 5 photos',
    icon: '📸',
    category: 'contribution',
    rarity: 'uncommon',
    condition: (progress) => progress.photosContributed >= 5,
  },
  // Special achievements
  {
    id: 'polyglot',
    name: 'Đa ngôn ngữ',
    nameEn: 'Polyglot',
    description: 'Sử dụng ứng dụng với cả 4 ngôn ngữ',
    descriptionEn: 'Use the app in all 4 languages',
    icon: '🗣️',
    category: 'special',
    rarity: 'rare',
    condition: (progress) => progress.languagesUsed?.length >= 4,
  },
  {
    id: 'audio_lover',
    name: 'Người yêu audio',
    nameEn: 'Audio Lover',
    description: 'Nghe 10 bài thuyết minh',
    descriptionEn: 'Listen to 10 audio guides',
    icon: '🔊',
    category: 'special',
    rarity: 'uncommon',
    condition: (progress) => progress.audiosListened >= 10,
  },
  {
    id: 'night_owl',
    name: 'Cú đêm',
    nameEn: 'Night Owl',
    description: 'Sử dụng ứng dụng sau nửa đêm',
    descriptionEn: 'Use the app after midnight',
    icon: '🌙',
    category: 'special',
    rarity: 'rare',
    condition: (progress) => progress.usedAtNight === true,
  },
];

// Initial progress state
const initialProgress = {
  points: 0,
  level: 1,
  achievements: [],
  heritagesViewed: [],
  quizzesCompleted: [],
  postQuizResults: {},
  streakDays: 0,
  maxStreak: 0,
  lastVisit: null,
  contributions: 0,
  photosContributed: 0,
  audiosListened: 0,
  languagesUsed: [],
  usedAtNight: false,
  createdAt: new Date().toISOString(),
};

// Create context
const GamificationContext = createContext(null);

/**
 * Calculate level from points
 */
function calculateLevel(points) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].threshold) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

/**
 * Get next level info
 */
function getNextLevel(currentLevel) {
  const index = LEVELS.findIndex(l => l.level === currentLevel);
  if (index < LEVELS.length - 1) {
    return LEVELS[index + 1];
  }
  return null;
}

/**
 * GamificationProvider component
 */
export function GamificationProvider({ children }) {
  const [progress, setProgress] = useState(initialProgress);
  const [isLoading, setIsLoading] = useState(true);
  const [newAchievement, setNewAchievement] = useState(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress({ ...initialProgress, ...parsed });
      }
    } catch {
      // Failed to load gamification data from localStorage
    }
    setIsLoading(false);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch {
        // Failed to save gamification data to localStorage
      }
    }
  }, [progress, isLoading]);

  /**
   * Check and unlock achievements
   */
  const checkAchievements = useCallback((currentProgress) => {
    ACHIEVEMENTS.forEach((achievement) => {
      if (!currentProgress.achievements?.includes(achievement.id)) {
        if (achievement.condition(currentProgress)) {
          // Unlock achievement
          setProgress((prev) => ({
            ...prev,
            achievements: [...(prev.achievements || []), achievement.id],
            points: prev.points + POINTS.ACHIEVEMENT_UNLOCK,
          }));
          // Show achievement modal
          setNewAchievement(achievement);
          setShowAchievementModal(true);
        }
      }
    });
  }, []);

  /**
   * Update progress
   */
  const updateProgress = useCallback((updates) => {
    setProgress((prev) => {
      const newProgress = { ...prev, ...updates };
      checkAchievements(newProgress);
      return newProgress;
    });
  }, [checkAchievements]);

  /**
   * Add points
   */
  const addPoints = useCallback((amount) => {
    setProgress((prev) => {
      const newPoints = prev.points + amount;
      const newLevel = calculateLevel(newPoints);
      return {
        ...prev,
        points: newPoints,
        level: newLevel.level,
      };
    });
  }, []);

  // Check and update streak on load
  useEffect(() => {
    if (!isLoading && progress.lastVisit) {
      const lastVisit = new Date(progress.lastVisit);
      const today = new Date();
      const diffTime = Math.abs(today - lastVisit);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        updateProgress({
          streakDays: progress.streakDays + 1,
          maxStreak: Math.max(progress.maxStreak, progress.streakDays + 1),
          lastVisit: today.toISOString(),
        });
        addPoints(POINTS.DAILY_STREAK);
      } else if (diffDays > 1) {
        updateProgress({
          streakDays: 1,
          lastVisit: today.toISOString(),
        });
      }
    } else if (!isLoading && !progress.lastVisit) {
      updateProgress({
        streakDays: 1,
        maxStreak: 1,
        lastVisit: new Date().toISOString(),
      });
    }
  }, [isLoading, progress.lastVisit, progress.streakDays, progress.maxStreak, updateProgress, addPoints]);

  // Check for night owl achievement
  useEffect(() => {
    if (!isLoading && !progress.usedAtNight) {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 5) {
        updateProgress({ usedAtNight: true });
      }
    }
  }, [isLoading, progress.usedAtNight, updateProgress]);

  /**
   * Record heritage view
   */
  const recordHeritageView = useCallback((heritageId) => {
    setProgress((prev) => {
      if (prev.heritagesViewed?.includes(heritageId)) {
        return prev; // Already viewed
      }
      const newViewed = [...(prev.heritagesViewed || []), heritageId];
      const newProgress = {
        ...prev,
        heritagesViewed: newViewed,
        points: prev.points + POINTS.VIEW_HERITAGE,
      };
      checkAchievements(newProgress);
      return newProgress;
    });
  }, [checkAchievements]);

  /**
   * Record quiz completion
   */
  const recordQuizCompletion = useCallback((quizId, score, total) => {
    const percentage = Math.round((score / total) * 100);
    const basePoints = POINTS.COMPLETE_QUIZ;
    const bonusPoints = percentage === 100 ? POINTS.QUIZ_PERFECT : 0;

    setProgress((prev) => {
      const newQuizzes = [
        ...(prev.quizzesCompleted || []),
        { id: quizId, score: percentage, date: new Date().toISOString() },
      ];
      const newProgress = {
        ...prev,
        quizzesCompleted: newQuizzes,
        points: prev.points + basePoints + bonusPoints,
      };
      checkAchievements(newProgress);
      return newProgress;
    });
  }, [checkAchievements]);

  /**
   * Record audio listen
   */
  const recordAudioListen = useCallback(() => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        audiosListened: (prev.audiosListened || 0) + 1,
        points: prev.points + POINTS.LISTEN_AUDIO,
      };
      checkAchievements(newProgress);
      return newProgress;
    });
  }, [checkAchievements]);

  /**
   * Record language use
   */
  const recordLanguageUse = useCallback((languageCode) => {
    setProgress((prev) => {
      if (prev.languagesUsed?.includes(languageCode)) {
        return prev;
      }
      const newLanguages = [...(prev.languagesUsed || []), languageCode];
      const newProgress = {
        ...prev,
        languagesUsed: newLanguages,
      };
      checkAchievements(newProgress);
      return newProgress;
    });
  }, [checkAchievements]);

  /**
   * Record contribution
   */
  const recordContribution = useCallback((photoCount = 0) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        contributions: (prev.contributions || 0) + 1,
        photosContributed: (prev.photosContributed || 0) + photoCount,
      };
      checkAchievements(newProgress);
      return newProgress;
    });
  }, [checkAchievements]);

  /**
   * Get current level info
   */
  const getCurrentLevel = useCallback(() => {
    return LEVELS.find(l => l.level === progress.level) || LEVELS[0];
  }, [progress.level]);

  /**
   * Get progress to next level
   */
  const getProgressToNextLevel = useCallback(() => {
    const current = getCurrentLevel();
    const next = getNextLevel(current.level);
    if (!next) {
      return { current, next: null, progress: 100, pointsNeeded: 0 };
    }
    const pointsInLevel = progress.points - current.threshold;
    const pointsForLevel = next.threshold - current.threshold;
    const progressPercent = Math.min((pointsInLevel / pointsForLevel) * 100, 100);
    return {
      current,
      next,
      progress: progressPercent,
      pointsNeeded: next.threshold - progress.points,
    };
  }, [progress.points, getCurrentLevel]);

  /**
   * Get unlocked achievements
   */
  const getUnlockedAchievements = useCallback(() => {
    return ACHIEVEMENTS.filter(a => progress.achievements?.includes(a.id));
  }, [progress.achievements]);

  /**
   * Get locked achievements
   */
  const getLockedAchievements = useCallback(() => {
    return ACHIEVEMENTS.filter(a => !progress.achievements?.includes(a.id));
  }, [progress.achievements]);

  /**
   * Get achievements by category
   */
  const getAchievementsByCategory = useCallback((category) => {
    return ACHIEVEMENTS.filter(a => a.category === category);
  }, []);

  /**
   * Reset all progress
   */
  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  /**
   * Close achievement modal
   */
  const closeAchievementModal = useCallback(() => {
    setShowAchievementModal(false);
    setNewAchievement(null);
  }, []);

  const value = {
    // State
    progress,
    isLoading,
    newAchievement,
    showAchievementModal,

    // Actions
    addPoints,
    updateProgress,
    recordHeritageView,
    recordQuizCompletion,
    recordAudioListen,
    recordLanguageUse,
    recordContribution,
    resetProgress,
    closeAchievementModal,

    // Getters
    getCurrentLevel,
    getProgressToNextLevel,
    getUnlockedAchievements,
    getLockedAchievements,
    getAchievementsByCategory,

    // Constants
    POINTS,
    LEVELS,
    ACHIEVEMENTS,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

/**
 * Hook to use gamification context
 */
export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}

export default GamificationContext;
